import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Backdrop from "../components/backdrop/index";
import styles from "../styles/Modal.module.css"

export default function PhaserGame() {
  const [prompt, setPrompt] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
        backgroundColor: "#48C4F8",
      });

      setIsLoading(false)
    }
    initPhaser();
  }, []);

  useEffect(() => {
    const dialogBoxEventListener = ({ detail }) => {
      console.log(detail);
      setPrompt(detail.areaName);
    };
    window.addEventListener("prompt", dialogBoxEventListener);
  }, []);

  const closePrompt = ()=>{
    // console.log("closing")
    setPrompt(false);
    const customEvent = new CustomEvent('promptClosed', {
    });
    window.dispatchEvent(customEvent);
  }

  return (
    <>
      {/* <Game/> */}
      <div id="game-content" key="game-content"></div>
      {prompt && <Backdrop onClick={closePrompt}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`${styles["modal"]} ${styles["orange-gradient"]}`}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button className={`${styles["button"]} ${styles["close"]}`} onClick={closePrompt}>Cancel</button>
            <h2>Enter {prompt}?</h2>
            <h4> Do you want to place your resort in {prompt}? </h4>
            <button
              className={`${styles["button"]} ${styles["close-button"]}`}
              onClick={()=>{console.log("func")}}
              style={{marginLeft:"15vw"}}
            >
              Yes
            </button>
            <button
              className={`${styles["button"]} ${styles["close-button"]}`}
              onClick={closePrompt}
              style={{marginLeft:"15vw"}}
            >
              No
            </button>
          </motion.div>
        </Backdrop>}
      <div >
            <span>asdf</span>
            asdf
        </div>
    </>
  );
}
