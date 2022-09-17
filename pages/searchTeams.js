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

export default function SearchTeamsPage() {
  const { status } = useSession();
  const router = useRouter();

  // redirects to home if user not logged in 
  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        toast.error(`Please login first!`)
        router.push("/")
      }
    }
  }, [status, router])

  return (
    <div>
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
            <ScrollProgressAnimation />
            <SearchTeamsWithSearch />
          </div>
        </ConfigProvider>}
    </div>
  );
}
