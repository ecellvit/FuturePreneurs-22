import Head from "next/head";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import PendingUserRequests from "../components/PendingUserRequests.jsx";
import NavigationBar from "../components/NavigationBar";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";



export default function PendingUserRequestsPage() {

  const { status } = useSession();
  const router = useRouter();

  // redirects to home if user not logged in 
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
        <title>Pending User Requests - FuturePreneurs 8.0 </title>
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
        <div className={styles.container}>
          <NavigationBar />
          <br />
          <PendingUserRequests />
        </div>}
    </>

  );
}
