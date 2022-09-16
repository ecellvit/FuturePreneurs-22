import React from 'react'
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import LinkJoining from '../../components/LinkJoining';
import NavigationBar from "../../components/NavigationBar.jsx";

function JoiningIdPage() {
  const router = useRouter();
  const { joiningId } = router.query;
  const { status } = useSession();

  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") {
      // router.push('/api/auth/signin')
      signIn('google', { callbackurl: `/join-team-link/${joiningId}` })
    }
  }, [status, joiningId])

  return (
    <div>
      <NavigationBar />
      {status === "authenticated" && <LinkJoining joiningId={joiningId} />}
    </div>

  )
}

export default JoiningIdPage