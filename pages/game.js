import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'

export default function PhaserGame() {
  const [game, setGame] = useState();
  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import('phaser');

      console.log(Phaser)
      const { default: GridEngine } = await import('grid-engine');

      const { default: Preloader } = await import('../scenes/Preloader');

      const { default: TestScene } = await import('../scenes/TestScene');

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
        scene: [
          Preloader,
          TestScene
        ],
        physics: {
          default: 'arcade',
          arcade: {
            debug: true,
          }
        },
        plugins: {
          scene: [
            {
              key: 'gridEngine',
              plugin: GridEngine,
              mapping: 'gridEngine'
            }
          ]
        },
        backgroundColor: "#48C4F8",
      })
      setGame(phaserGame)
    }
    initPhaser()
  }, [])

  return (
    <>
      {/* <Game/> */}
      <div id="game-content" key="game-content"></div>
    </>
  )
}       