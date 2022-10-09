import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading"


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
      setPrompt(true);
    };
    window.addEventListener("prompt", dialogBoxEventListener);
  }, []);

  return (
    <>
      {/* <Game/> */}
      {isLoading ? <Loading /> : <>
        <div id="game-content" key="game-content"></div>
        {prompt && (
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            <Modal
              modalOpen={prompt}
              handleClose={() => {
                console.log("asdf");
              }}
              text={"Are you sure you want to delete your team?"}
              text1={"This action can't be reversed!!"}
              text2={"Yes I'm sure"}
            />
          </AnimatePresence>
        )}</>}

    </>
  );
}
