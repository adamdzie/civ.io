import { app, Graphics } from "./App.js";
import { Interpolator } from "./Interpolator.js";
import View from "./View.js";

export class Player extends Interpolator {
  constructor(position, rotation) {
    super(position, rotation);

    this.position = position;

    this.buildings = {};
    this.citiesCords = {};

    this.gold = 0;
    this.goldIncome = 0;
    this.science = 0;
    this.scienceIncome = 0;
    this.population = 0;
    this.populationIncome = 0;
    this.amenities = 0;

    var texture = PIXI.Texture.from("./Assets/Player/Hero.png");

    this.cont = new PIXI.Container();

    this.sprite = new PIXI.Sprite(texture);

    // this.sprite.x = position.x;
    // this.sprite.y = position.y;
    this.cont.x = position.x;
    this.cont.y = position.y;

    // this.cont.anchor.x = 0.5;
    // this.cont.anchor.y = 0.5;
    // this.sprite.anchor.x = 0.5;
    // this.sprite.anchor.y = 0.5;
    this.cont.addChild(this.sprite);

    View.Add([this.cont]);
    //app.stage.addChild(this.sprite);
    //this.sprite.angle = 0;
    this.cont.pivot.x += 35;
    this.cont.pivot.y += 35;
  }

  update(delta) {
    this.UpdateInterpolator(delta);
    this.updatePosition();
    this.updateRotation();
  }
  updatePosition() {
    this.position = this.currentPosition;
    this.cont.x = this.position.x;
    this.cont.y = this.position.y;
    //console.log(this.position);w
  }
  updateRotation() {
    this.cont.rotation = this.currentAngle;
  }
  setRotation(rotation) {
    this.cont.rotation = rotation;
  }
  updateResources(resources) {
    this.gold = resources.gold;
    this.science = resources.science;
    this.population = resources.population;
  }
}
