import Head from "next/head";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import PendingUserRequests from "../components/PendingUserRequests.jsx";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (session === null) {
      router.push('/')
    }
  }, [router.isReady, session, router])

  return (
    <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Futurepreneurs</h1>
      <PendingUserRequests />
    </div>
  );
}
