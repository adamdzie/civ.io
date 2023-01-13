import { Graphics, Text, map, app, resources, Container } from "./app.js";

export class ShowConstruction {
  constructor() {
    this.currentConstruction = "none";

    this.constructionAssets = {};
    this.constructionAssets["City"] = resources.assets["City_temp"];
    this.constructionAssets["City"].renderable = false;

    this.container = new PIXI.Container();
    this.container.zIndex = 1000;

    this.container.addChild(this.constructionAssets["City"]);
    app.stage.addChild(this.container);
  }
  //TODO IMPROVEMENT POSSIBLE, CHANGE CONTAINER POSITION ONLY WHEN HEX IS CHANGING
  Show(construction, hexPosition) {
    if (
      construction !== "none" &&
      this.currentConstruction !== "none" &&
      this.currentConstruction !== construction
    )
      this.constructionAssets[this.currentConstruction].renderable = false;

    this.currentConstruction = construction;
    this.constructionAssets[construction].renderable = true;
    this.container.x =
      hexPosition.x - this.constructionAssets[construction].width / 2;
    this.container.y =
      hexPosition.y - this.constructionAssets[construction].height / 2;
  }
  DisableShow() {
    if (this.currentConstruction !== "none") {
      this.constructionAssets[this.currentConstruction].renderable = false;
      this.currentConstruction = "none";
    }
  }
}
