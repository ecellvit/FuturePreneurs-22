import Head from "next/head";
import {useSession} from "next-auth/react";
import { NextResponse } from "next/server.js";
import LoginTempComponent from "../components/LoginTempComponent.jsx";
// import Dashboard from "../components/Dashboard.jsx";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import SearchTeams from "../components/SearchTeams.jsx";
import PendingRequests from "../components/PendingRequests.jsx"
import PendingUserRequests from "../components/PendingUserRequests.jsx";

// this is Landing page, here people will learn about the event and signup/login

export default function Home() {
  const {data:session} = useSession();
  const router = useRouter();

// redirects to Dashboard if user session is logged in session!  
  
  useEffect(()=>{
    if (!router.isReady) return;

    if (session===null){
      router.push('/')
    }
  }, [router.isReady, session,router])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Futurepreneurs</h1>
      <PendingUserRequests/>
      {/* <LoginTempComponent />
      <Dashboard/> */}
    </div>
  );
}