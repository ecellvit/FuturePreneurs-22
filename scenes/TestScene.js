import {
  Scene
} from 'phaser'

export default class TestScene extends Scene {
    constructor() {
        super('testscene')
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

        // map.addTilesetImage('overWorld', 'overWorld');

        map.layers.forEach((layer, index) => {
            map.createLayer(index, ['beach', 'hospital', 'bridge','city','temple','school', 'island'], 0, 0)
            // map.createLayer(index, ['overWorld'], 0, 0)
        })

    const heroSprite = this.physics.add.sprite(0, 0, 'hero');

    this.cameras.main.startFollow(heroSprite, true);
    this.cameras.main.setFollowOffset(-heroSprite.width, -heroSprite.height)

    const gridEngineConfig = {
      characters: [{
        id: 'hero',
        sprite: heroSprite,
        startPosition: {
          x: 8,
          y: 8
        }
      }]
    }
    this.gridEngine.create(map, gridEngineConfig)

    const collideLayer = map.getLayer("")

    this.itemsSprites = this.add.group()

    let triggered = false;

    const dataLayer = map.getObjectLayer("prompt");
    dataLayer.objects.forEach((object) => {
      let tmp = this.add.rectangle((object.x+(object.width/2)), (object.y+(object.height/2)), object.width, object.height);
      tmp.properties = object.properties.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }), {}
      );
      this.physics.world.enable(tmp, 1);
      this.physics.add.collider(heroSprite, tmp, (objA, objB)=>{
        // console.log("collide trigger here");
        if (!triggered){
          const customEvent = new CustomEvent('prompt', {
            detail: {
              areaName: objB.properties.area,
            },
          });
          window.dispatchEvent(customEvent);
          // this.physics.world.disable(tmp, 1);
          triggered = true;
          console.log(triggered)
          this.time.delayedCall(3000, () => {
            triggered = false
          });
        }
      }, null, this);
    });

    this.physics.add.co

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