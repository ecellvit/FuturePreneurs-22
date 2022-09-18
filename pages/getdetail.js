import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sign from "../components/Sign";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";

export default function GetUserDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status !== "loading" && status === "authenticated" && router.isReady) {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          setIsLoading(false)
          if (data.isRegistered) {
            router.push('/dashboard')
          };
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [status, router, session])

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
      {isLoading ? <Loading /> :
        status === "authenticated" && <Sign />}
    </>

  )
}
