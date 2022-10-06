import { Scene } from 'phaser'

export default class TestScene extends Scene {
    constructor() {
        super('testscene')
    }
    create() {
        const map = this.make.tilemap({ key: 'testmap' });
        map.addTilesetImage('CloudCity', 'tiles')

        map.layers.forEach((layer, index) => {
            console.log(layer)
            map.createLayer(index, 'CloudCity', 0, 0)
        })

        const playerSprite = this.physics.add.sprite(0, 0, "hero");

        this.cameras.main.startFollow(playerSprite, true);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)

        const gridEngineConfig = {
            characters: [
                {
                    id: 'hero',
                    sprite: playerSprite,
                    startPosition: { x: 8, y: 8 }
                }
            ]
        }

        this.gridEngine.create(map, gridEngineConfig)

        this.itemsSprites = this.add.group();

        const dataLayer = map.getObjectLayer("actions");

        dataLayer.objects.forEach((data) => {
            const { properties, x, y } = data;

            properties.forEach((property) => {
                const { name, type, value } = property;
                switch (name) {
                    case "itemData":
                        {
                            const [itemType] = value.split(":");
                            switch (itemType) {
                                case "sword": {
                                    const item = this.physics.add
                                        .sprite(x, y, "sword")
                                        .setDepth(1)
                                        .setOrigin(0, 1);

                                    item.itemType = "sword";
                                    this.itemsSprites.add(item);
                                    break;
                                }
                                default:
                                    console.log("default sword");
                            }
                        }
                        break;
                    default:
                        console.log("default itemData");
                        break;
                }
            });
        });

        this.physics.add.overlap(playerSprite, this.itemsSprites, (objA, objB) => {
            const item = [objA, objB].find((obj) => obj !== playerSprite);
            // console.log(item);
            if (item.itemType === 'sword') {
                console.log(playerSprite.scaleX, playerSprite.scaleY)
                // console.log("overlap")
                const customEvent = new CustomEvent('prompt', {
                    detail: {
                        characterName: item.itemType,
                    },
                });
                window.dispatchEvent(customEvent);
                // item.destroy();
            }
        })
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