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
  const [prompt, setPrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [endTime, setEndTime] = useState();
  const router = useRouter();

  const { hours, minutes, seconds } = useTimer(endTime);

  const myCtx = useContext(myContext);
  const TEAM_ID = myCtx.teamId;

  useEffect(()=>{
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
          if (data.error?.errorCode === 21){
            router.push("/instructions")
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
          console.log(data)
          setEndTime(data.endTime);
        
      }).catch(e=>{
        console.log(e);
      })

    }
  }, [session])
  
  // 2022-10-15T18:45:33.927Z

  useEffect(()=>{
    if (hours==0 & minutes==0 & seconds==0){
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
            if (data.error?.errorCode === 21){
              // redirect
              console.log("21asdf")
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
      // redirect to instructions
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
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        pixelArt: true,
        scale: {
          zoom: 2,
          // autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [Preloader, TestScene],
        physics: {
          default: "arcade",
          arcade: {
            debug: true,
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
    if (reply){
      console.log(reply);
      let areaNum;
      switch (reply){
        case "temple":
          areaNum = 0;
          break
        case "beach":
          areaNum = 1;
          break
        case "business":
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
      console.log(areaNum)
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
          console.log(data)
        })
      }
    }

    setPrompt(reply);
    const customEvent = new CustomEvent('promptClosed', {
      detail: {
        reply:reply
      }
    });
    window.dispatchEvent(customEvent);
  }

  return (
    <>
    <ToastContainer/>
      {endTime && <div className={styles.starting}>
        <div className={styles.btn}>
          <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
            {hours}:{minutes}:{seconds}
          </a>
        </div>
      </div>}
      {isLoading ? <Loading /> : <>
        <div id="game-content" key="game-content"></div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {prompt &&
            <Modal
              modalOpen={prompt}
              handleClose={()=>{closePrompt(false)}}
              text={`Do you want to place your resort in ${prompt}?`}
              text1={"This action can't be reversed!!"}
              text2={"Yes I'm sure"}
              text2func={()=>{closePrompt(prompt)}}
            />
          }
        </AnimatePresence>
      </>}
    </>
  );
}
