import MyName from './myname'
import MyButton from './mybutton'
import styles from './page.module.css'

export default function Home() {
  return (<div className={styles.main}>
    <MyName/>
    <MyButton/>
    </div>)
}