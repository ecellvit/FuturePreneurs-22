const TILE_SIZE = 45;

export class Player {

  constructor(sprite,tilePos) {
    const offsetX = TILE_SIZE / 2;
    const offsetY = TILE_SIZE;

    this.sprite = sprite;
    this.tilePos= tilePos;

    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      tilePos.x * TILE_SIZE + offsetX,
      tilePos.y * TILE_SIZE + offsetY
    );
    this.sprite.setFrame(55);
  }

  getPosition() {
    return this.sprite.getBottomCenter();
  }

  setPosition(position) {
    this.sprite.setPosition(position.x, position.y);
  }

  stopAnimation(direction) {
    const animationManager = this.sprite.anims.animationManager;
    const standingFrame = animationManager.get(direction).frames[1].frame.name;
    this.sprite.anims.stop();
    this.sprite.setFrame(standingFrame);
  }

  startAnimation(direction) {
    this.sprite.anims.play(direction);
  }

  getTilePos() {
    return this.tilePos.clone();
  }

  setTilePos(tilePosition) {
    this.tilePos = tilePosition.clone();
  }
}
