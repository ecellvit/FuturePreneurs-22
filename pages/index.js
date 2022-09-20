import Head from "next/head";
import styles from "../styles/Home.module.css";
import Landing_main from "../components/Landing_main.jsx";
import NavigationBar from "../components/NavigationBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FuturePreneurs 8.0, E-Cell VIT</title>
        <meta
          name="FuturePreneurs VIT Vellore"
          content="FuturePreneurs 8.0 VIT Vellore, E-Cell"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NavigationBar />
      <Landing_main />
    </div>
  );
}
