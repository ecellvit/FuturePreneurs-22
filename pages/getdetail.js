import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sign from "../components/Sign";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";

export default function GetUserDetailsPage() {
  const { status } = useSession();
  const router = useRouter();

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
      {status === "loading" ? <Loading /> :
        status === "authenticated" && <Sign />}
    </>

  )
}
