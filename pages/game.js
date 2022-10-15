import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading"

export default function PhaserGame() {
  const [prompt, setPrompt] = useState(null);
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
  }, []);

  const closePrompt = (reply) => {
    setPrompt(false);
    const customEvent = new CustomEvent('promptClosed', {
      detail: {
        reply:reply
      }
    });
    window.dispatchEvent(customEvent);
  }

  return (
    <>
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
