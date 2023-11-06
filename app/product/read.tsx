"use client"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/Config";
import { useState, useEffect } from "react";
import { Product } from "../_settings/interfaces";

function useRead() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<Product[]>([]);
  const [updated, setUpdated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let data: Product[] = [];
      const productRef = collection(db, "FAQtest")
      const productQuery = query(productRef, orderBy("price"));
      const querySnapshot = await getDocs(productQuery);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, desc: doc.data().desc, price: doc.data().price })
        console.log(`${doc.id} => ${doc.data()}`);
      });
      setProducts(() => [...data]);
      setIsLoading(false);
    }
    fetchData();
  }, [db, updated]);

  async function addProduct(products: { desc: string, price: number }) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "FAQtest"),
      { desc: products.desc, price: products.price });
    console.log("Document written with ID: ", docRef.id);
    setUpdated((currentValue) => currentValue + 1)
  }

  async function deleteProduct(id: string) {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "FAQtest", id));
      setUpdated((currentValue) => currentValue + 1)
    }
    catch (error) {
      console.error(error);
    }
  }

  async function updateProduct(product: Product)  {
    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "FAQtest", product.id),{ desc: product.desc, price: product.price });
      setUpdated((currentValue) => currentValue + 1)
    }
    catch (error) {
      console.error(error);
    }
  }

  return [products, addProduct, deleteProduct, updateProduct, isLoading] as const;

}

export default useRead;
