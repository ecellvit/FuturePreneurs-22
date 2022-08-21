import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [globalSession, setglobalSession] = useState(null);

  useEffect(() => {
    const getMySession = async () => {
      const session = await getSession();
      setglobalSession(session);
    };
    getMySession();
  }, []);

  useEffect(() => {
    if (globalSession?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error while asking for refreshtoken
    }
  }, [globalSession]);


  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
