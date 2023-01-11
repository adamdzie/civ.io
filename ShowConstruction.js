import { Graphics, Text, map, app, resources } from "./app.js";

export class ShowConstruction {
  constructor() {
    this.city_sprite = resources.assets["City_temp"];
    this.city_sprite.zIndex = 1000;
    app.stage.addChild(this.city_sprite);
    this.city_sprite.renderable = false;
  }
  Show(construction, hexPosition) {
    if (construction === "City") {
      this.city_sprite.renderable = true;
      this.city_sprite.x = hexPosition.x - this.city_sprite.width / 2;
      this.city_sprite.y = hexPosition.y - this.city_sprite.height / 2;
    }
  }
}
