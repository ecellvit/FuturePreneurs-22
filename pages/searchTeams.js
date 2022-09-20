import Head from "next/head";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import { ConfigProvider } from 'react-avatar';
import SearchTeamsWithSearch from "../components/SearchTeamsWithSearch.jsx";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import ScrollProgressAnimation from "../components/animationComponents/ScrollProgress";
import NavigationBar from "../components/NavigationBar";

export default function SearchTeamsPage() {
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
    <div>
      <Head>
        <title>Find teams for FuturePreneurs 8.0</title>
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
        <ConfigProvider colors={['#130AE6', '#236DCE', '#BC304B', '#BF3EC3', '#E69951']}>
          <div className={styles.container}>
            <Head>
              <title>Find Teams and Ideate in FuturePreneurs 8.0</title>
              <meta name="find teams" content="Find and Join Teams in FuturePreneurs 8.0" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <br />
            <NavigationBar />
            <ScrollProgressAnimation />
            <SearchTeamsWithSearch />
          </div>
        </ConfigProvider>}
    </div>
  );
}
