import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Dashboard from "../../components/TeamDashboard/Dashboard.jsx";
import NavigationBar from '../../components/NavigationBar.jsx';
import { useRouter } from 'next/router.js';

function Main() {
  // if session is not logged in dont show dashboard.
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
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