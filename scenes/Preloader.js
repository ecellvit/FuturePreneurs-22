import { Scene } from "phaser";

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.image('tiles', "assets/cloud_tileset.png");
        this.load.tilemapTiledJSON('testmap', 'assets/cloud-city.json')
        this.load.spritesheet('hero', 'assets/characters.png', {
            frameWidth: 16,
            frameHeight: 32
        })
    }

    create() {
        this.scene.start('testscene')
    }
}