import * as Phaser from "phaser";

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 528;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super()
  }

  create() {
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("cloudCity", "tiles1");
    cloudCityTilemap.addTilesetImage("overWorld", "tiles2");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createLayer(i, ["cloudCity", "overWorld"], 0, 0)
      layer.setDepth(i);
      layer.scale = 3;
    }
  }

  update() {}


  preload() {    
    this.load.image("tiles1", "assets/cloud_tileset.png");
    this.load.image("tiles2", "assets/Overworld.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/map1.json");
  }
}

const gameConfig = {
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
  parent: "game",
  backgroundColor: "#48C4F8",
};

export const game = new Phaser.Game(gameConfig);