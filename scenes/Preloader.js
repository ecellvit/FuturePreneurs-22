import { Scene } from "phaser";

export default class Preloader extends Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        const fontSize = 16;
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        const { width: gameWidth, height: gameHeight } = this.cameras.main;

        const barPositionX = Math.ceil((gameWidth - (gameWidth * 0.7)) / 2);
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(
            barPositionX,
            Math.ceil(gameHeight / 6),
            Math.ceil(gameWidth * 0.7),
            Math.ceil(gameHeight / 10)
        );

        const loadingText = this.add.text(
            gameWidth / 2,
            Math.ceil(gameHeight / 10),
            'loading...',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize}px`,
                size: `${fontSize}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        );

        loadingText.setOrigin(0.5);
        loadingText.setResolution(30);

        const percentText = this.add.text(
            gameWidth / 2,
            Math.ceil((gameHeight / 6) + (fontSize / 2) + (gameHeight / 60)),
            '0%',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize}px`,
                size: `${fontSize}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        );

        percentText.setOrigin(0.5);
        percentText.setResolution(30);
        
        const assetText = this.add.text(
            gameWidth / 2,
            Math.ceil(gameHeight / 3),
            '',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize / 2}px`,
                size: `${fontSize / 2}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        );

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xFFFFFF, 1);
            progressBar.fillRect(
                barPositionX,
                Math.ceil(gameHeight / 6),
                Math.ceil(gameWidth * 0.7) * value,
                Math.ceil(gameHeight / 10)
            );
            percentText.setText(`${Number.parseInt(value * 100, 10)}%`);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText(`loading: ${file.key}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            assetText.destroy();
        });

      this.load.image('island', "assets/land.png");
      this.load.image('hospital', "assets/hospital.png");
      this.load.image('bridge', "assets/villagetileset.png");
      this.load.image('city', "assets/modern_buildings.png");
      this.load.image('beach', "assets/beach_tileset.png");
      this.load.image('school', "assets/school.png");
      this.load.image('temple', "assets/monument.png");
      this.load.tilemapTiledJSON('testmap', 'assets/fpmapround1final.json')

      //loading charachter
      this.load.atlas('hero', "assets/sprites/atlas/hero.png", "assets/sprites/atlas/hero.json");
    }

    create() {
        this.scene.start('testscene')
    }
}