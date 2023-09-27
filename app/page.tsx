import ProductList from "./listitem";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <ProductList/>
    </div>
  );
}
