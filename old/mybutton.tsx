"use client";
import { useState } from "react";
export default function MyButton() {
  const [count, setCount] = useState(0);
  const [searches, setSearches] = useState<number[]>([]);
  function handleClick() {
    setCount(Math.floor(Math.random() * 10));
    setSearches((searches) => [...searches, count]);
  }

  return (
    <div>
      {searches.map((x) => x + " ")}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
