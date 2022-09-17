import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Dashboard from "../../components/TeamDashboard/Dashboard.jsx";
import NavigationBar from '../../components/NavigationBar.jsx';
import { useRouter } from 'next/router.js';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading.jsx';

export default function DashboardPage() {
  // if session is not logged in dont show dashboard.
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        router.push("/")
      }
    }
  }, [status, router])

  return (
    <>
      <ToastContainer />
      {status === "loading" ? <Loading /> : status === "authenticated" &&
        <div className='main'>
          {/* <NavigationBar /> */}
          <Dashboard />
        </div>}
    </>
  )
}