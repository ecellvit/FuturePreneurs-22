import { useEffect, useState } from "react";
import Modal from "../components/modal";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

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
        width: 400,
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
      setPrompt(true);
    };
    window.addEventListener("prompt", dialogBoxEventListener);
  }, []);

  return (
    <>
      {/* <Game/> */}
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
      )}
    </>
  );
}
