import { useSession } from 'next-auth/react';
import React, { useEffect }, { useEffect } from 'react'
import Dashboard from "../../components/TeamDashboard/Dashboard.jsx";
import LoginTempComponent from '../../components/LoginTempComponent';
import NavigationBar from '../../components/NavigationBar.jsx';
import { Router, useRouter } from 'next/router.js';
import NavigationBar from '../../components/NavigationBar.jsx';
import { Router, useRouter } from 'next/router.js';

function Main() {
  // if session is not logged in dont show dashboard.
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("status", status);
    if (router.isReady) {
      if (status === "unauthenticated" && status !== "loading") {
        router.push("/")
      }
    }
  }, [status, router])

  return (
    <>
      {status === "authenticated" &&
        <div className='main'>
          <NavigationBar />
          <Dashboard />
        </div>
      }
    </>
  )
}

export default Main