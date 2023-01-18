import { app, Graphics } from "./App.js";
import { Interpolator } from "./Interpolator.js";
import View from "./View.js";

export class Player extends Interpolator {
  constructor(position, radius, move_speed, rotation) {
    super(position, rotation);
    this.position = position;
    this.radius = radius;
    this.move_speed = move_speed;
    this.buildings = {};
    this.citiesCords = {};

    this.gold = 0;
    this.goldIncome = 0;
    this.science = 0;
    this.scienceIncome = 0;
    this.population = 0;
    this.populationIncome = 0;
    this.amenities = 0;

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

    View.Add([this.sprite]);
    //app.stage.addChild(this.sprite);
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
    //console.log(this.position);w
  }
  updateRotation() {
    this.sprite.rotation = this.currentAngle;
  }
  setRotation(rotation) {
    this.sprite.rotation = rotation;
  }
}
