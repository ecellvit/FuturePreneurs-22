import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SignLayout from "./SignLayout";
import { toast } from "react-toastify";

const Sign = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
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
      .then((data) => {
        console.log(data);
        setLoading(false);
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
        if (data.hasFilledDetails === true) {
          router.push("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  }, [session]);

  return !loading ? <SignLayout /> : null;
};

export default Sign;
