import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import PendingRequests from "../components/PendingRequests.jsx"
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import NavigationBar from "../components/NavigationBar";

export default function PendingRequestsPage() {
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

      <ToastContainer />
      <NavigationBar />
      {status === "loading" ?
        <Loading /> :
        status === "authenticated" &&
        <div className={styles.container}>
          <br />
          <PendingRequests />
        </div>}
    </>
  );
}
