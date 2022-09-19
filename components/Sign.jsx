import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SignLayout from "./SignLayout";

import { toast } from "react-toastify";
// import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie'

const Sign = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const [useEffectTrigger, setUseEffectTrigger] = useState(false);

  const handleLinkSubmit = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  const handleJoin = async () => {
    console.log('handle login function')
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/token`, {
      method: 'PATCH',
      body: JSON.stringify({
        token: Cookies.get('user'),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((data) => data.json())

      .then((data) => {
        console.log('handle join')
        console.log(data)
      })
  }

  useEffect(() => {
   if(session){ 
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
      method: "PATCH",
      body: JSON.stringify({
        token: session.idToken,
        email: session.user.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(async (data) => {
        setTimeout(()=>{
          setLoading(false)
        }, 1000)

        console.log(data);
        // setLoading(false);
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        if (data.hasFilledDetails === true && Cookies.get('user')) {
          await handleJoin();
          Cookies.remove('user')
        }
        if (data.hasFilledDetails === true) {
          router.push("/dashboard");
        }
      })
      .catch((err) => console.log(err));}
  }, [session,useEffectTrigger]);

  console.log('cookies in sign in')
  console.log(Cookies.get('user'))

  return !loading ? <SignLayout handleLinkSubmit={handleLinkSubmit}/> : null;
};

export default Sign;
