import Head from "next/head";
import NavigationBar from "../components/NavigationBar.jsx";
import styles from "../styles/Home.module.css";
// import { Landing } from "../components/Landing.jsx";
import Landing_main from "../components/Landing_main.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FuturePreneurs 8.0</title>
        <meta
          name="FuturePreneurs VIT Vellore"
          content="FuturePreneurs 8.0 VIT Vellore, E-Cell"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <NavigationBar /> */}
      <Landing_main />
    </div>
  );
}
