import React from 'react'
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import LinkJoining from '../../components/LinkJoining';

function JoiningIdPage() {
  const router = useRouter();
  const { joiningId } = router.query;
  const { data: session ,status} = useSession();

  useEffect(()=>{
    if (status === "unauthenticated" && status !== "loading"){
      // router.push('/api/auth/signin')
      signIn('google',{ callbackurl: `/join-team-link/${joiningId}`})
    }
  }, [status])
  
  
  return (
    <div>
      {session ? <LinkJoining joiningId={joiningId}/> : "nothing"}
    </div>

  )
}

export default JoiningIdPage