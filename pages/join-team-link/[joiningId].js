import React from 'react'
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LinkJoining from '../../components/LinkJoining';
import Sign from '../../components/Sign';

function JoiningIdPage() {
  const router = useRouter();
  const { joiningId } = router.query;

  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") {
      // router.push('/api/auth/signin')
      signIn('google', { callbackurl: `/join-team-link/${joiningId}` })
    }
  }, [status])

  const handleJoin = async () => {
    console.log("handle login function")
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/token`, {
      method: "PATCH",
      body:
        JSON.stringify({
          "token": `${joiningId}`,
        }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())

      .then((data) => {
        console.log("handle join")
        console.log(data)
      })
  }

  useEffect(() => {
    // setLoading(true);
    if (session) {
      console.log(session)
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
        method: "PATCH",
        body: JSON.stringify({
          "token": session.idToken,
          "email": session.user.email,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
        }
      // fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${session.accessTokenBackend}`,
      //     "Access-Control-Allow-Origin": "*",
      //   },
      })
        .then((data) => data.json())
        .then(async (data) => {
          if (data.hasFilledDetails === true) {
            console.log("first");
            await handleJoin();
            // router.push("/dashboard");
            console.log("second");
          } else {
            setLoading(false);
          }
        })
    }
  }, [session]);


  return (
    <div>
      // {session ?  <Sign/>  : "nothing"}
      <NavigationBar />
      {status === "authenticated" && <LinkJoining joiningId={joiningId} />}
    </div>

  )
}

export default JoiningIdPage