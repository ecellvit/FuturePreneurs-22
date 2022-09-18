import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import NavigationBar from "../components/NavigationBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <>
        <NavigationBar />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >

          <Component {...pageProps} />
        </AnimatePresence>
      </>
    </SessionProvider>
  );
}

export default MyApp;
