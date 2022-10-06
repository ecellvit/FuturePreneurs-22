import { useEffect } from "react";

export default function Game() {
  const CANVAS_WIDTH = 720;
  const CANVAS_HEIGHT = 528;

  useEffect(() => {
    (async () => {
      window.Phaser = await import(`phaser`);
    })()
      .then((result) => {
        class GameScene extends Phaser.Scene {
          constructor() {
            super({ key: "GameScene", active: true, visible: true });
          }
          create() {
            console.log("create");
            const cloudCityTilemap = this.make.tilemap({
              key: "cloud-city-map",
            });
            cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
            for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
              const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
              layer.setDepth(i);
              layer.scale = 3;
            }
          }

          update() {}

          preload() {
            this.load.image("tiles", "./assets/clout_tileset.png");
            this.load.tilemapTiledJSON(
              "cloud-city-map",
              "./assets/cloud-city.json"
            );
          }
        }
        const game = new Phaser.Game({
          title: "Sample",
          // render: {
          //   // antialias: false,
          // },
          type: Phaser.AUTO,
          scene: GameScene,
          scale: {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            // autoCenter: Phaser.Scale.CENTER_BOTH,
          },
          parent: "game-content",
          backgroundColor: "#48C4F8",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <text style={{ backgroundColor: "white" }}>asdf</text>
      <div id="game-content"></div>
    </>
  );
}