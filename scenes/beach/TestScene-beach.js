import {
  Scene
} from 'phaser'

export default class TestScene extends Scene {
  constructor() {
    super('testscene-beach')
  }

  createPlayerWalkingAnimation(assetKey, animationName) {
    this.anims.create({
      key: `${assetKey}_${animationName}`,
      frames: [
        { key: assetKey, frame: `${assetKey}_${animationName}_01` },
        { key: assetKey, frame: `${assetKey}_${animationName.replace('walking', 'idle')}_01` },
        { key: assetKey, frame: `${assetKey}_${animationName}_02` },
      ],
      frameRate: 4,
      repeat: -1,
      yoyo: true,
    });
  }

  getStopFrame(direction, spriteKey) {
    switch (direction) {
      case 'up':
        return `${spriteKey}_idle_up_01`;
      case 'right':
        return `${spriteKey}_idle_right_01`;
      case 'down':
        return `${spriteKey}_idle_down_01`;
      case 'left':
        return `${spriteKey}_idle_left_01`;
      default:
        return null;
    }
  }

  create() {
    const map = this.make.tilemap({ key: 'testmap-beach' });
    map.addTilesetImage('buildings', 'buildings', 12, 12, 0, 0)
    map.addTilesetImage('beach', 'beach', 12, 12, 0, 0)
    map.addTilesetImage('road', 'road', 12, 12, 0, 0)
    map.addTilesetImage('village', 'village', 12, 12, 0, 0)
    map.addTilesetImage('bakery', 'bakery', 12, 12, 0, 0)
    map.addTilesetImage('planetorium', 'planetorium', 12, 12, 0, 0)
    map.addTilesetImage('apartments', 'apartments', 12, 12, 0, 0)
    map.addTilesetImage('island', 'island')
    map.addTilesetImage('beach_road', 'beach_road', 12, 12, 0, 0)
    map.addTilesetImage('beachhouse', 'beachhouse', 12, 12, 0, 0)
    map.addTilesetImage('beachhouse2', 'beachhouse2', 12, 12, 0, 0)

    map.layers.forEach((layer, index) => {
      map.createLayer(index, ['buildings', 'beach', 'road', 'village', 'bakery', 'planetorium', 'apartments', 'island', 'beach_road', 'beachhouse', 'beachhouse2'], 0, 0)
    })

    this.heroSprite = this.physics.add.sprite(0, 0, 'hero').setDepth(1);

    this.cameras.main.startFollow(this.heroSprite, true);
    this.cameras.main.setFollowOffset(-this.heroSprite.width, -this.heroSprite.height)

    const gridEngineConfig = {
      characters: [{
        id: 'hero',
        sprite: this.heroSprite,
        startPosition: {
          x: 8,
          y: 8
        },
        speed: 7
      }]
    }
    this.gridEngine.create(map, gridEngineConfig)

    this.itemsSprites = this.add.group();

    // Movement
    this.createPlayerWalkingAnimation('hero', 'walking_up');
    this.createPlayerWalkingAnimation('hero', 'walking_right');
    this.createPlayerWalkingAnimation('hero', 'walking_down');
    this.createPlayerWalkingAnimation('hero', 'walking_left');

    this.gridEngine.movementStarted().subscribe(({ charId, direction }) => {
      if (charId === 'hero') {
        this.heroSprite.anims.play(`hero_walking_${direction}`);
      }
    });

    this.gridEngine.movementStopped().subscribe(({ charId, direction }) => {
      if (charId === 'hero') {
        this.heroSprite.anims.stop();
        this.heroSprite.setFrame(this.getStopFrame(direction, charId));
      }
    });

    this.gridEngine.directionChanged().subscribe(({ charId, direction }) => {
      if (charId === 'hero') {
        this.heroSprite.setFrame(this.getStopFrame(direction, charId));
      }
    });

    let triggered = false;

    const dataLayer = map.getObjectLayer("prompt");
    dataLayer.objects.forEach((object) => {
      let tmp = this.add.rectangle((object.x + (object.width / 2)), (object.y + (object.height / 2)), object.width, object.height);
      tmp.properties = object.properties?.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }), {}
      );
      this.physics.world.enable(tmp, 1);
      this.physics.add.collider(this.heroSprite, tmp, (objA, objB) => {
        // console.log("collide trigger here");
        if (!triggered) {
          const customEvent = new CustomEvent('prompt', {
            detail: {
              areaName: objB.properties.area,
            },
          });
          window.dispatchEvent(customEvent);

          // const dialogBoxEventListener = () => {
          //   this.physics.world.disable(tmp, 1);
          // };
          // window.addEventListener("promptClosed", dialogBoxEventListener);

          triggered = true;
          this.time.delayedCall(6000, () => {
            triggered = false
          });
        }
      }, null, this);
    });
  }

  update() {
    let keyA
    let keyS
    let keyD
    let keyW
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    const cursors = this.input.keyboard.createCursorKeys()

    if (cursors.left.isDown || keyA.isDown) {
      this.gridEngine.move('hero', 'left')
    } else if (cursors.right.isDown || keyD.isDown) {
      this.gridEngine.move('hero', 'right')
    } else if (cursors.up.isDown || keyW.isDown) {
      this.gridEngine.move('hero', 'up')
    } else if (cursors.down.isDown || keyS.isDown) {
      this.gridEngine.move('hero', 'down')
    }
  }
}