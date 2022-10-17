import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading"
import useTimer from "../hooks/useTimer";
import styles from "../styles/MainQuiz.module.css";
import { useContext } from "react";
import myContext from "../store/myContext";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


export default function PhaserGame() {
  const { status } = useSession();
  const [prompt, setPrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [endTime, setEndTime] = useState();
  const router = useRouter();

  const { hours, minutes, seconds } = useTimer(endTime);

  const myCtx = useContext(myContext);
  const TEAM_ID = myCtx.teamId;

  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/start/${TEAM_ID}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      }).then(async (response) => {
        return response.json();
      }).then((data) => {
        if (data.error?.errorCode) {
          console.log(data.error.errorCode)
          if (data.error.errorCode == 31) {
            console.log("already played 1");
            // window.location = "/instructions";
          }
          if (data.error.errorCode == 33) {
            console.log('already played 1')
            // window.location = '/instructions'
          }
          if (data.error.errorCode === 21) {
            console.log('time limit exceeded')
            // window.location = '/instructions'
          }
          window.location = '/instructions-fp-eight-ecell'
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

      }).catch(e => {
        console.log(e);
      })

    }
  }, [session])

  // 2022-10-15T18:45:33.927Z

  useEffect(() => {
    if (hours <= 0 & minutes <= 0 & seconds <= 0) {
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
                window.location = '/instructions-fp-eight-ecell'
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
          })
      }
      window.location = "/instructions-fp-eight-ecell"
    }
  }, [seconds])

  useEffect(() => {
    setIsLoading(true)
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: GridEngine } = await import("grid-engine");
      const { default: Preloader } = await import("../scenes/Preloader");
      const { default: TestScene } = await import("../scenes/TestScene");

      const phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        title: "round-one",
        parent: "game-content",
        width: 700,
        height: 300,
        pixelArt: true,
        scale: {
          zoom: 2,
          autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        scene: [Preloader, TestScene],
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
        backgroundColor: "#66e6d3",
      });
      setIsLoading(false)
    }
    initPhaser();
  }, []);

  useEffect(() => {
    const dialogBoxEventListener = ({ detail }) => {
      setPrompt(detail.areaName);
    };
    window.addEventListener("prompt", dialogBoxEventListener);
  }, [session]);

  const closePrompt = (reply) => {
    if (reply) {
      let areaNum;
      switch (reply) {
        case "temple":
          areaNum = 0;
          break
        case "beach":
          areaNum = 1;
          break
        case "Tech Park":
          areaNum = 2;
          break
        case "hospital":
          areaNum = 3;
          break
        case "school":
          areaNum = 4;
          break
        default:
          areaNum = 5;
          break
      }

      if (session) {
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/${TEAM_ID}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            mapChoice: areaNum,
          })
        }).then(async (response) => {
          return response.json();
        })
          .then((data) => {
            window.location = '/instructions-fp-eight-ecell'
          })
      }
    }
    setPrompt(false);
  }

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
        {endTime && <div className={styles.starting}>
          <div className={styles.btn}>
            <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
              {hours < 10 ? '0' + hours.toString() : hours}:{minutes < 10 ? '0' + minutes.toString() : minutes}:{seconds < 10 ? '0' + seconds.toString() : seconds}
            </a>
          </div>
        </div>}
        {isLoading ? <Loading /> : <>
          <div>
            <div id="game-content" key="game-content"></div>
          </div>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {prompt &&
              <Modal
                modalOpen={prompt}
                handleClose={() => { closePrompt(false) }}
                text={`Do you want to place your resort in ${prompt}?`}
                text1={"THIS ACTION CAN'T BE REVERSED!!"}
                text2={"Yes I'm sure"}
                text2func={() => {
                  closePrompt(prompt)
                }}
              />
            }
          </AnimatePresence>
        </>}
      </>)
  );
}
