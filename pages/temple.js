import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useTimer from "../hooks/useTimer";
import { useContext } from "react";
import myContext from "../store/myContext";
import styles from "../styles/MainQuiz.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PhaserGame() {
  const [prompt, setPrompt] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const [endTime, setEndTime] = useState();
  const router = useRouter();

  const { hours, minutes, seconds } = useTimer(endTime);

  const myCtx = useContext(myContext);
  const TEAM_ID = myCtx.teamId;

  useEffect(() => {
    // redirect to correct map
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/${TEAM_ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then(async (response) => {
          return response.json();
        })
        .then((data) => {
          switch (data.mapChoice) {
            // case 0:
            //   window.location = "/temple";
            //   break;
            case 1:
              window.location = "/beach";
              break;
            case 2:
              window.location = "/techPark";
              break;
          }
        });
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundtwo/start/${TEAM_ID}`,
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
            if (data.error.errorCode == 31) {
              console.log("already played 1");
              // window.location = "/instructions";
            }
            if (data.error.errorCode === 21) {
              console.log("time limit exceeded");
              // window.location = "/instructions";
            }
            if (data.error.errorCode === 37) {
              console.log("round 1 not complete");
              // window.location = "/instructions";
            }
            window.location = "/instructions-ecell-rox231";
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

  useEffect(() => {
    if (hours <= 0 & minutes <= 0 & seconds <= 0) {
      console.log("time done")
      if (session) { // send 5 = null
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/${TEAM_ID}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            mapChoice: 5,
          })
        }).then(async (response) => {
          return response.json();
        })
          .then((data) => {
            if (data.error?.errorCode) {
              if (data.error?.errorCode === 21) {
                window.location = '/instructions-ecell-rox231'
              }
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
            }
            console.log(data);
          })
      }
      window.location = "/instructions-ecell-rox231"
    }
  }, [seconds])

  useEffect(() => {
    setIsLoading(true);
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: GridEngine } = await import("grid-engine");
      const { default: TestScene } = await import(
        "../scenes/temple/templeGame"
      );

      const phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        title: "round-one-temple",
        parent: "game-content",
        width: 700,
        height: 300,
        pixelArt: true,
        scale: {
          zoom: 2,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        scene: [TestScene],
        physics: {
          default: "arcade",
          arcade: {
            debug: false,
          },
        },
        plugins: {
          scene: [
            {
              key: "gridEngine",
              plugin: GridEngine,
              mapping: "gridEngine",
            },
          ],
        },
        backgroundColor: "#9592a2",
      });

      setIsLoading(false);
    }
    initPhaser();
  }, []);

  useEffect(() => {
    const dialogBoxEventListener = ({ detail }) => {
      setPrompt(detail.areaName);
    };
    window.addEventListener("prompt", dialogBoxEventListener);
  }, []);

  const closePrompt = (reply) => {
    if (reply) {
      console.log(reply.slice(-1));
      if (session) {
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/team/roundtwo/${TEAM_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessTokenBackend}`,
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              boxChoice: reply.slice(-1),
            }),
          }
        )
          .then(async (response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            // after submitting box no.
            window.location = "/instructions-ecell-rox231";
          });
      }
    }
    setPrompt(false);

    // const customEvent = new CustomEvent('promptClosed', {
    // });
    // window.dispatchEvent(customEvent);
  };


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
        {/* <Game/> */}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {endTime && (
              <div className={styles.starting}>
                <div className={styles.btn}>
                  <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
                    {hours < 10 ? '0' + hours.toString() : hours}:{minutes < 10 ? '0' + minutes.toString() : minutes}:{seconds < 10 ? '0' + seconds.toString() : seconds}
                  </a>
                </div>
              </div>
            )}
            <div>
              <div id="game-content" key="game-content"></div>
            </div>
            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {prompt && (
                <Modal
                  modalOpen={prompt}
                  handleClose={() => {
                    closePrompt(false);
                  }}
                  text={`Do you want to place your resort in this Area? (${prompt})`}
                  text1={"This action can't be reversed!!"}
                  text2={"Yes I'm sure"}
                  text2func={() => {
                    closePrompt(prompt);
                  }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </>)
  );
}
