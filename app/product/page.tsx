"use client"
import useRead from '../read'

export default function Home() {
  const [products, setProducts]=useRead();
  return (
    <div>
      <h1>Product List</h1>
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