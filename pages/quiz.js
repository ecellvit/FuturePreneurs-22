import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavigationBar from "../components/NavigationBar";
import Questions from "../components/Questions";

function RoundOnePage() {
  const { data: session, status } = useSession();
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
      {/* <NavigationBar/> */}
      <Questions />
    </>
  );
}

export default RoundOnePage;
