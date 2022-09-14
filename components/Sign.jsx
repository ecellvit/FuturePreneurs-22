import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SignLayout from "./SignLayout";

const Sign = () => {
  // const [hasDetails, setDetails] = useState();
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session.user.email);
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady, router]);

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
        if (data.hasFilledDetails !== false) {
          router.push("/dashboard");
        }
      }, []);
  });

  // useEffect(() => {
  //   if (hasDetails) {
  //     router.push("/dashboard");
  //   }
  // }, [hasDetails]);
  return <SignLayout />;
  // return <div>{!hasDetails ? <SignLayout /> : null}</div>;
  // return <div>{}</div>;
};

export default Sign;
