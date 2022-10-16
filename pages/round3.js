import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-toastify/dist/ReactToastify.css";
import DragFinal from "../components/roundOnePointThree/DragFinal";
import NavigationBar from "../components/NavigationBar";
import { useState } from "react";
import useTimer from "../hooks/useTimer";
import { useContext } from "react";
import myContext from "../store/myContext";

export default function Round3() {
  const { status } = useSession();
  const { data: session } = useSession();

  const [endTime, setEndTime] = useState();
  const router = useRouter();

  const { hours, minutes, seconds } = useTimer(endTime);

  const myCtx = useContext(myContext);
  const TEAM_ID = myCtx.teamId; 

  useEffect(() => {
    if (session) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundthree/start/${TEAM_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then(async (response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error?.errorCode) {
            console.log(data.error.errorCode);
            window.location = "/instructions";
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          } else {
            setEndTime(data.endTime);
          }
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [session]);

  // redirects to home if user not logged in
  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        toast.error("Please Login First!");
        router.push("/");
      }
    }
  }, [session, status, router]);
  console.log(session);
  return (
    status === "authenticated" && (
      <>
        <ToastContainer />
        {endTime && (
          <div className={styles.starting}>
            <div className={styles.btn}>
              <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
                {hours}:{minutes}:{seconds}
              </a>
            </div>
          </div>
        )}
        {/* <ToastContainer /> */}
        <NavigationBar />
        <DndProvider backend={HTML5Backend}>
          <DragFinal />
        </DndProvider>
      </>
    )
  );
}
