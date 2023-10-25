"use client"
import Button from '@mui/material/Button';
import useRead from './edit'

export default function Home() {
  const [products, setProducts, addProducts, add]=useRead();
  return (
    <div>
      <h1>Product List</h1>
      <Button variant="contained" color="primary" onClick={add}>新增</Button>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>Desc:</strong> {product.desc}, <strong>Price:</strong> {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}