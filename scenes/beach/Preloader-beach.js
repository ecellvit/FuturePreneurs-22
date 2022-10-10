import { Scene } from "phaser";

export default class Preloader extends Scene {
    constructor() {
        super('preloader-beach');
    }

    preload() {
        //map assets
        this.load.image('buildings', "assets/round-two/beach/buildings.png");
        this.load.image('beach', "assets/round-two/beach/beach.png");
        this.load.image('road', "assets/round-two/beach/road.png");
        this.load.image('village', "assets/round-two/beach/village.png");
        this.load.image('bakery', "assets/round-two/beach/bakery.png");
        this.load.image('apartments', "assets/round-two/beach/apartments.png");
        this.load.image('planetorium', "assets/round-two/beach/planetorium.png");
        this.load.image('island', "assets/round-two/beach/island.png");
        this.load.image('beach_road', "assets/round-two/beach/beach_road.jpg");
        this.load.image('beachhouse', "assets/round-two/beach/beachhouse.png");
        this.load.image('beachhouse2', "assets/round-two/beach/beachhouse2.png");

        this.load.tilemapTiledJSON('testmap-beach', 'assets/round-two/beach/fpmap2final.json')

        //loading charachter
        this.load.atlas('hero', "assets/sprites/atlas/hero.png", "assets/sprites/atlas/hero.json");
    }

    create() {
        this.scene.start('testscene-beach')
    }
}