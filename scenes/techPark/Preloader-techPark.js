import { Scene } from "phaser";

export default class Preloader extends Scene {
    constructor() {
        super('preloader-techPark');
    }

    preload() {
        //map assets
        this.load.image('buildings', "assets/round-two/techPark/buildings.png");
        this.load.image('road', "assets/round-two/techPark/road.png");
        this.load.image('apartments', "assets/round-two/techPark/apartments.png");
        this.load.image('hotel', "assets/round-two/techPark/hotel.png");
        this.load.image('buildings2', "assets/round-two/techPark/buildings2.png");
        this.load.image('village', "assets/round-two/techPark/villagetileset.png");
        this.load.image('auditorium', "assets/round-two/techPark/auditorium.png");
        this.load.image('itcenter', "assets/round-two/techPark/itcenter.png");
        this.load.image('station', "assets/round-two/techPark/train.png");

        this.load.tilemapTiledJSON('testmap-techPark', 'assets/round-two/techPark/fpmap4final.json')

        //loading charachter
        this.load.atlas('hero', "assets/sprites/atlas/hero.png", "assets/sprites/atlas/hero.json");
    }

    create() {
        this.scene.start('testscene-techPark')
    }
}