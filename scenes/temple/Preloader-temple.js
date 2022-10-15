import { Scene } from "phaser";

export default class Preloader extends Scene {
    constructor() {
        super('preloader-temple');
    }

    preload() {
        //map assets
        this.load.image('buildings', "assets/round-two/temple/buildings.png");
        this.load.image('road', "assets/round-two/temple/road.png");
        this.load.image('apartments', "assets/round-two/temple/apartments.png");
        this.load.image('temple', "assets/round-two/temple/temple.png");
        this.load.image('buildings2', "assets/round-two/temple/buildings2.png");
        this.load.image('village', "assets/round-two/temple/village.png");
        this.load.image('bakery', "assets/round-two/temple/bakery.png");

        this.load.tilemapTiledJSON('testmap-temple', 'assets/round-two/temple/fpmapround3.json')

        //loading charachter
        this.load.atlas('hero', "assets/sprites/atlas/hero.png", "assets/sprites/atlas/hero.json");
    }

    create() {
        this.scene.start('testscene-temple')
    }
}