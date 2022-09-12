import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import SignLayout from "./SignLayout";

const Sign = () => {
  const [hasDetails, setDetails] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // redirects to Dashboard if user session is logged in session!

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady, router]);
  useEffect(() => {
    if (hasDetails) {
      router.push("/dashboard");
    }
  }, [hasDetails]);
  return <div>{!hasDetails ? <SignLayout /> : null}</div>;
};

export default Sign;
