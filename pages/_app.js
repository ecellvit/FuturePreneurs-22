import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import Footer from "../components/landing_main/Footer";
import NavigationBar from "../components/NavigationBar";
import { MyContextProvidor } from "../store/myContext";
import "../styles/globals.css";
import styles from "../styles/Landingr.module.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MyContextProvidor>
        <div className={styles.body}>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >

            <Component {...pageProps} />
            <div className={styles["push"]}></div>
          </AnimatePresence>
        </div>
        <div className={styles["footer"]}>
          <Footer />
        </div>
      </MyContextProvidor>
    </SessionProvider >
  );
}

export default MyApp;
