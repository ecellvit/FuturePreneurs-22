import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Dashboard from "../../components/TeamDashboard/Dashboard.jsx";
import NavigationBar from '../../components/NavigationBar.jsx';
import { useRouter } from 'next/router.js';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading.jsx';
import Head from 'next/head.js';

export default function DashboardPage() {
  // if session is not logged in dont show dashboard.
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        toast.error("Please Login First!")
        router.push("/")
      }
    }
  }, [status, router])

  return (
    <>
      <Head>
        <title>Team Dashboard - FuturePreneurs 8.0</title>
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
      <ToastContainer />
      {status === "loading" ? <Loading /> : status === "authenticated" &&
        <div className='main'>
          <NavigationBar />
          <Dashboard />
        </div>}
    </>
  )
}