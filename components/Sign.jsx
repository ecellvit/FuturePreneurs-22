import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SignLayout from "./SignLayout";

const Sign = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
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
        if (data.error.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (data.hasFilledDetails === true) {
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      }, []);
  });
  return !loading ? <SignLayout /> : null;
};

export default Sign;
