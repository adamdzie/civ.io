import { app, Graphics } from "./app.js";
import { Interpolator } from "./Interpolator.js";

export class Player extends Interpolator {
  constructor(position, radius, move_speed, rotation) {
    super(position, rotation);
    this.position = position;
    this.radius = radius;
    this.move_speed = move_speed;

    let circle = new Graphics();

    circle
      .beginFill(0x22aacc)
      .lineStyle(3, 0x000000, 1)
      .drawCircle(this.position.x, this.position.y, this.radius)
      .endFill();

    var texture = PIXI.Texture.from("./Assets/Player/Hero.png");

    this.cont = new PIXI.Container();

    this.sprite = new PIXI.Sprite(texture);

    this.sprite.x = position.x;
    this.sprite.y = position.y;
    //this.cont.x = position.x;
    //this.cont.y = position.y;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.cont.addChild(this.sprite);

    app.stage.addChild(this.sprite);
    //this.sprite.angle = 0;
  }

  update(delta) {
    this.UpdateInterpolator(delta);
    this.updatePosition();
    this.updateRotation();
  }
  updatePosition() {
    this.position = this.currentPosition;
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
  updateRotation() {
    this.sprite.rotation = this.currentAngle;
  }
  setRotation(rotation) {
    this.sprite.rotation = rotation;
  }
}
