"use client"
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
import app from "@/app/_firebase/Config";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function useRead() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<{ desc: string; price: number }[]>([]);
  const [newProduct, setNewProduct] = useState<{ desc: string; price: number; visible:boolean }>({desc:"", price:0, visible: false});
  const [updated, setUpdated] = useState(0);

  const show = () => {
    setNewProduct({ ...newProduct, visible: true });
  };

  const hide = () => {
    setNewProduct({ ...newProduct, visible: false });
  };

  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "price") {
      setNewProduct({ ...newProduct, [e.target.name]: parseInt(e.target.value) })
    }
    else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
  }

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "FAQtest"));
      const data = querySnapshot.docs.map((doc) => ({
        desc: doc.data().desc,
        price: doc.data().price,
      }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [db]);

  async function addProducts(products: { desc: string, price: number }) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "FAQtest"),
      { desc: products.desc, price: products.price });
    console.log("Document written with ID: ", docRef.id);
    setUpdated((currentValue) => currentValue + 1)
  }

  function add() {
    addProducts(newProduct);
    setNewProduct({ ...newProduct, visible: false })
    console.log(products);
  }

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
  }, [db, updated]);

  {newProduct.visible && (
    <Dialog
      open={newProduct.visible}
      onClose={hide}
      aria-labelledby="新增產品"
    >
      <DialogTitle>
        
      </DialogTitle>
      <DialogContent>
        <TextField
          label="產品描述"
          variant="outlined"
          name="desc"
          value={newProduct.desc}
          onChange={handleClick}
        />
        <br />
        <TextField
          label="產品價格"
          variant="outlined"
          name="price"
          value={newProduct.price}
          onChange={handleClick}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <IconButton
          aria-label="close"
          onClick={hide}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={add}>
        </Button>
      </DialogActions>
    </Dialog>
  )}

  return [products, setProducts, addProducts, add] as const;
}

export default useRead;
