import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sign from "../components/sign";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && router.isReady) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/`, {
        method: "POST",
        // cors:'no-cors',
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: session.idToken,
          email: session.user.email,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          if(data.isRegistered){
            router.push('/dashboard')
          };
        })
        .catch((err) => {
          console.log("errrr", err);
        });
    }
  }, [session, router])

  console.log(session);
  useEffect(()=>{
    console.log("status",status);
    if (router.isReady){
      if (status === "unauthenticated" && status!=="loading"){
          router.push("/")
      }
    }
  }, [status, router])

  return (
    <>
    {status === "authenticated" && <Sign/>}
    </>
  )
}
