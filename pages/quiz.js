import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Questions from "../components/Questions";

function RoundOnePage() {
    const {data:session, status} = useSession();
    const router = useRouter();
    
    // redirects to home if user not logged in 
    useEffect(()=>{
      if (router.isReady){
        if (status === "unauthenticated" && status!=="loading"){
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
