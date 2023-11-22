'use client'
import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Input, TextField } from '@mui/material';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import app from "@/app/_firebase/Config";
import { FirebaseError } from 'firebase/app';
import Image from 'next/image'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
export default function Account() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [account, setAccount] = useState({ email: "", password: "", name: "", photo: "next.svg" });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("註冊");
  const [file, setFile] = useState<File>();
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const changeStatus = function (e: React.MouseEvent<HTMLElement>) {
    if (status === "註冊") {
      setStatus("登入");
    }
    else {
      setStatus("註冊");
    }
  }
  const logout = function (e: React.MouseEvent<HTMLElement>) {
    auth.signOut();
    setStatus("登入");
    setMessage("登出成功");
  }

  const handleUpload = async function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      console.log(e.target.files[0]);
      setAccount({ ...account, photo: e.target.files[0].name })
      setFile(e.target.files[0]);
    }

  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      setMessage(`Google 登入成功，歡迎 ${res.user?.displayName}`);

      const userCollection = collection(db, "users");

      const querySnapshot = await getDocs(query(userCollection, where("uid", "==", res.user?.uid)));

      if (querySnapshot.empty) {
        await addDoc(userCollection, {
          uid: res.user?.uid,
          email: res.user?.email,
          name: account.name,
          admin: "user",
        });
      }
    } catch (error) {
      setMessage("Google 登入失敗");
      console.error(error);
    }
  };
  

  const handleSubmit = async function (e: React.MouseEvent<HTMLElement>) {
    try {
      if (status === "註冊") {
        const res = await createUserWithEmailAndPassword(auth, account.email, account.password);
        setMessage(`註冊成功，歡迎 ${res.user?.email}`);
        console.log(file)
        setStatus("登入成功");

        // Create a reference to the image
        if (file) {

          const imageRef = ref(storage, file.name);
          // 'file' comes from the Blob or File API
          await uploadBytes(imageRef, file);
          // console.log(res)
          setMessage(`個人照片上傳成功，歡迎 ${res.user?.email}`);
          const userDoc = await setDoc(doc(db, "users", res.user.uid), { photo: file.name });
          const starsRef = ref(storage, file.name);
          const photoURL = await getDownloadURL(starsRef);
          setAccount({ ...account, photo: photoURL })

        }
        else {
          setMessage("未上傳檔案");
        }
      }
      else {
        const res = await signInWithEmailAndPassword(auth, account.email, account.password);
        setMessage(`登入成功，歡迎 ${res.user?.email}`);
        if (res) {
          const userDoc = await getDoc(doc(db, "users", res.user.uid));
          let photo = '下載.jpg';
          if (userDoc.exists()) {
            photo = userDoc.data().photo ? userDoc.data().photo : '下載.jpg'
          }
          // console.log(photo)
          const starsRef = ref(storage, photo);
          const photoURL = await getDownloadURL(starsRef);
          setAccount({ ...account, photo: photoURL })
          console.log(photoURL)

        }
        setStatus("登入成功");
      }
    }
    catch (e) {
      if (e instanceof FirebaseError) {
        let message = "";
        switch (e.code) {
          case "auth/email-already-in-use":
            message = "電子信箱已註冊";
            break;
          case "auth/weak-password":
            message = "密碼強度不足";
            break;
          case "auth/invalid-email":
            message = "電子郵件格式錯誤";
            break;
          case "auth/user-not-found":
            message = "電子郵件信箱不存在";
            break;
          case "auth/wrong-password":
            message = "密碼錯誤";
            break;
          case "auth/too-many-requests":
            message = "登入失敗次數過多，請稍後再試";
            break;
          default:
            message = "系統錯誤:" + e.code;
        }
        setMessage(message);
      }
      else {
        if (e instanceof Error) {
          setMessage(e.message);
        }
        else {
          setMessage("系統錯誤");
        }
      }
    }

  }

  return (
    <form>
      {status === '登入成功' &&
        <Card sx={{ maxWidth: "30vw" }}>
          <CardMedia component="img" image={account.photo} alt={account.email} />
          <CardContent>{account.email}</CardContent>
        </Card>
      }

      {(status === '註冊' || status === '登入') &&
        <div>
          <div>
            <TextField type="email" name="email" value={account.email}
              placeholder="電子郵件信箱" label="電子郵件信箱:" onChange={handleChange} autoComplete='username' />
          </div>
          <div>
            <TextField type="password" name="password" value={account.password}
              placeholder="密碼" label="密碼:" onChange={handleChange} autoComplete='current-password' />
          </div>
        </div>
      }

      {status === '註冊' &&
        <div>
          <div>
            <TextField type="text" name="name" value={account.name}
              placeholder="姓名" label="姓名:" onChange={handleChange} />
          </div>
          <div>
            <TextField type="file" inputProps={{ accept: 'image/x-png,image/jpeg' }} onChange={handleUpload} />
          </div>
        </div>
      }
      {status === '註冊' || status === '登入' ?
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>{status}</Button>
        </div> :
        <div>
          <Button variant="contained" color="primary" onClick={logout}>登出</Button>
        </div>
      }
      <div>{message}</div>

      <div>
        <Button variant="contained" color="secondary" onClick={changeStatus}>
          {status === '註冊' ? "已經註冊，我要登入" : "尚未註冊，我要註冊"}</Button>
      </div>

      <div>
        <Button variant="contained" color="secondary" onClick={logout}>
        {"登出"}</Button>
      </div>

      <div>
        <Button variant="contained" color="secondary" onClick={handleGoogleSignIn}>
          {"Google 登入"}
        </Button>
      </div>
    </form>

  )
}