import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import styles from "../styles/Landingr.module.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={styles.body}>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >

          <Component {...pageProps} />
          {/* <div className={styles["push"]}></div> */}
        </AnimatePresence>
        {/* <div className={styles["footer"]}>
          <Footer />
        </div> */}
      </div>
    </SessionProvider >
  );
}

export default MyApp;
