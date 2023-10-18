"use client"
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/_firebase/Config";
import { useState, useEffect } from "react";

function useRead() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<{ desc: string; price: number }[]>([]);

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

  return [products, setProducts] as const;
}

export default useRead;
