import { Scene } from "phaser";

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }

    preload() {
      this.load.image('island', "assets/land.png");
      this.load.image('hospital', "assets/hospital.png");
      this.load.image('bridge', "assets/villagetileset.png");
      this.load.image('city', "assets/modern_buildings.png");
      this.load.image('beach', "assets/beach_tileset.png");
      this.load.image('school', "assets/school.png");
      this.load.image('temple', "assets/monument.png");
      this.load.tilemapTiledJSON('testmap', 'assets/fpr1m1.0.2.json')

      //loading charachter
      this.load.atlas('hero', "assets/sprites/atlas/hero.png", "assets/sprites/atlas/hero.json");
    }

    create() {
        this.scene.start('testscene')
    }
}