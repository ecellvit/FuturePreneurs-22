import Head from "next/head";
import {useSession} from "next-auth/react";
import { NextResponse } from "next/server.js";
import LoginTempComponent from "../components/LoginTempComponent.jsx";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import SearchTeams from "../components/SearchTeams.jsx";
import PendingRequests from "../components/PendingRequests.jsx"
import NavigationBar from "../components/NavigationBar.jsx";

export default function Home() {
  const {data:session} = useSession();
  const router = useRouter();
  
  useEffect(()=>{
    if (!router.isReady) return;

    if (session===null){
      router.push('/')
    }
  }, [router.isReady, session,router])

  return (
    <div className={styles.container}>
      <NavigationBar/>
      <br/>
      <PendingRequests/>
    </div>
  );
}
