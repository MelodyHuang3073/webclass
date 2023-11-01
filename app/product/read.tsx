"use client"
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
import app from "@/app/_firebase/Config";
import { useState, useEffect } from "react";

function useRead() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<{ desc: string; price: number }[]>([]);
 

  useEffect(() => {
    async function fetchData() {
      let data: { desc: string, price: number }[] = [];
      const querySnapshot = await getDocs(collection(db, "FAQtest"));
      querySnapshot.forEach((doc) => {
        data.push({ desc: doc.data().desc, price: doc.data().price })
        console.log(`${doc.id} => ${doc.data()}`);
      });
      setProducts(() => [...data]);
    }
    fetchData();
  }, [db]);

  async function addProduct(product: { desc: string, price: number }) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "FAQtest"),
      { desc: product.desc, price: product.price });
    console.log("Document written with ID: ", docRef.id);
  }



  return [products, setProducts, addProduct] as const;
}

export default useRead;
