import { useEffect, useState } from "react";
import Modal from "../components/modal";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Backdrop from "../components/backdrop/index";
import styles from "../styles/Modal.module.css"

export default function PhaserGame() {
  const [prompt, setPrompt] = useState();

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");

      console.log(Phaser);
      const { default: GridEngine } = await import("grid-engine");
      const { default: Preloader } = await import("../scenes/Preloader");
      const { default: TestScene } = await import("../scenes/TestScene");

      const phaserGame = new Phaser.Game({
        // render: {
        //   antialias: false,
        // },
        type: Phaser.AUTO,
        title: "round-one",
        // scene: TestScene,
        parent: "game-content",
        width: 396,
        height: 300,
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
