import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginTempComponent = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Logged in!</h1>
        <h2>My email is : {session.user.email}</h2>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default LoginTempComponent;
