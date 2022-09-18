import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import NavigationBar from "../components/NavigationBar";
import "../styles/globals.css";
import styles from "../styles/Landingr.module.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={styles.body}>
        <NavigationBar />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >

          <Component {...pageProps} />
        </AnimatePresence>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
