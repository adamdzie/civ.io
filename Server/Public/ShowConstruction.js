import { Graphics, Text, app, Container } from "./App.js";
import Resources from "./Resources.js";
import View from "./View.js";

class ShowConstruction {
  constructor() {}
  initialize() {
    this.currentConstruction = "none";

    this.constructionAssets = {};
    this.constructionAssets["City"] = Resources.assets["City_temp"];
    this.constructionAssets["City"].renderable = false;

    this.container = new PIXI.Container();
    this.container.zIndex = 1000;

    this.container.addChild(this.constructionAssets["City"]);
    View.Add([this.container]);
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

const singletonInstance = new ShowConstruction();

export default singletonInstance;
