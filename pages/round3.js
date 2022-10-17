import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DragFinal from "../components/roundOnePointThree/DragFinal";
import { useState } from "react";
import useTimer from "../hooks/useTimer";
import { useContext } from "react";
import myContext from "../store/myContext";
import styles from "../styles/MainQuiz.module.css";
export default function Round3() {
  const { status } = useSession();
  const { data: session } = useSession();

  const [endTime, setEndTime] = useState();
  const router = useRouter();

  const { hours, minutes, seconds } = useTimer(endTime);

  const myCtx = useContext(myContext);
  const TEAM_ID = myCtx.teamId;


  useEffect(() => {
    if ((hours <= 0) & (minutes <= 0) & (seconds <= 0)) {
      window.location = "/instructions-fp-eight-ecell";
    }
  }, [seconds]);

  // redirects to home if user not logged in
  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        toast.error("Please Login First!");
        router.push("/");
      }
    }
  }, [session, status, router]);

  return (
    status === "authenticated" && (
      <>
        <ToastContainer />
        {endTime && (
          <div className={styles.starting}>
            <div className={styles.btn}>
              <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
                {hours.toString().length < 2 ? "0" + hours : hours}:
                {minutes.toString().length < 2 ? "0" + minutes : minutes}:
                {seconds.toString().length < 2 ? "0" + seconds : seconds}
              </a>
            </div>
          </div>
        )}
        <DragFinal setEndTime={setEndTime}/>
      </>
    )
  );
}
