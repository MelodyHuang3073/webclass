import ProductList from "./products";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <ProductList />
    </div>
  );
}
