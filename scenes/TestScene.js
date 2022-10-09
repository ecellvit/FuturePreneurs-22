import {
  Scene
} from 'phaser'

export default class TestScene extends Scene {
  constructor() {
    super('testscene')
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
    const map = this.make.tilemap({ key: 'testmap' });
    map.addTilesetImage('beach', 'beach', 12, 12, 0, 0)
    map.addTilesetImage('hospital', 'hospital', 12, 12, 0, 0)
    map.addTilesetImage('bridge', 'bridge', 12, 12, 0, 0)
    map.addTilesetImage('city', 'city', 12, 12, 0, 0)
    map.addTilesetImage('temple', 'temple', 12, 12, 0, 0)
    map.addTilesetImage('school', 'school', 12, 12, 0, 0)
    map.addTilesetImage('island', 'island')

    map.layers.forEach((layer, index) => {
      console.log(layer)
      map.createLayer(index, ['beach', 'hospital', 'bridge', 'city', 'temple', 'school', 'island'], 0, 0)
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
    // const dataLayer = map.getObjectLayer("prompt");
    // dataLayer.objects.forEach((data) => {
    //   const {
    //     properties,
    //     x,
    //     y
    //   } = data;

    //   properties.forEach((property) => {
    //     const {
    //       name,
    //       type,
    //       value
    //     } = property;
    //     switch (name) {
    //       case "itemData": {
    //         const [itemType] = value.split(":");
    //         switch (itemType) {
    //           case "sword": {
    //             const item = this.physics.add
    //               .sprite(x, y, "sword")
    //               .setDepth(1)
    //               .setOrigin(0, 1);

    //             item.itemType = "sword";
    //             this.itemsSprites.add(item);
    //             break;
    //           }
    //           default:
    //             console.log("default sword");
    //         }
    //       }
    //       break;
    //     default:
    //       console.log("default itemData");
    //       break;
    //     }
    //   });
    // });
    // this.physics.add.overlap(heroSprite, this.itemsSprites, (objA, objB) => {
    //   const item = [objA, objB].find((obj) => obj !== heroSprite);
    //   console.log(item);
    //   if (item.itemType === 'sword') {
    //     console.log("overlap")
    //     const customEvent = new CustomEvent('prompt', {
    //       detail: {
    //         characterName: item.itemType,
    //       },
    //     });
    //     window.dispatchEvent(customEvent);
    //     item.destroy();
    //   }
    // })
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.gridEngine.move('hero', "left")
    } else if (cursors.right.isDown) {
      this.gridEngine.move('hero', "right")
    } else if (cursors.up.isDown) {
      this.gridEngine.move('hero', "up")
    } else if (cursors.down.isDown) {
      this.gridEngine.move('hero', "down")
    }
  }
}