import { Graphics, Text, app, Container } from "./App.js";
import Resources from "./Resources.js";
import View from "./View.js";
import Grid from "./Grid.js";
import { socket_id } from "./App.js";

class ShowConstruction {
  constructor() {}
  initialize() {
    this.currentConstruction = "none";

    this.constructionAssets = {};
    this.constructionAssets["City"] = Resources.assets["City_temp"];
    this.constructionAssets["City"].renderable = false;

    this.constructionAssets["Bank"] = Resources.assets["City_temp"];
    this.constructionAssets["Bank"].renderable = false;

    this.constructionAssets["Lab"] = Resources.assets["City_temp"];
    this.constructionAssets["Lab"].renderable = false;

    this.constructionAssets["House"] = Resources.assets["City_temp"];
    this.constructionAssets["House"].renderable = false;

    this.constructionAssets["Amphitheatre"] = Resources.assets["City_temp"];
    this.constructionAssets["Amphitheatre"].renderable = false;

    this.constructionAssets["Forbidden"] = Resources.assets["Forbidden"];
    this.constructionAssets["Forbidden"].renderable = false;

    this.container = new PIXI.Container();
    this.container.zIndex = 1000;

    this.container.addChild(this.constructionAssets["City"]);
    this.container.addChild(this.constructionAssets["Bank"]);
    this.container.addChild(this.constructionAssets["Lab"]);
    this.container.addChild(this.constructionAssets["House"]);
    this.container.addChild(this.constructionAssets["Amphitheatre"]);
    this.container.addChild(this.constructionAssets["Forbidden"]);
    View.Add([this.container]);
  }
  //TODO IMPROVEMENT POSSIBLE, CHANGE CONTAINER POSITION ONLY WHEN HEX IS CHANGING
  Show(construction, hexPosition, hexCord) {
    if (
      construction !== "none" &&
      this.currentConstruction !== "none" &&
      this.currentConstruction !== construction
    )
      this.constructionAssets[this.currentConstruction].renderable = false;

    if (construction === "City") {
      if (Grid.map[[hexCord.x, hexCord.y]].canBuildCity)
        this.currentConstruction = construction;
      else {
        //this.constructionAssets[this.currentConstruction].renderable = false;
        this.currentConstruction = "Forbidden";
      }
    } else {
      if (Grid.map[[hexCord.x, hexCord.y]].hexOwner === socket_id)
        this.currentConstruction = construction;
      else {
        //this.constructionAssets[this.currentConstruction].renderable = false;
        this.currentConstruction = "Forbidden";
      }
    }
    console.log(this.currentConstruction);
    //this.currentConstruction = construction;
    this.constructionAssets[this.currentConstruction].renderable = true;
    this.container.x =
      hexPosition.x -
      this.constructionAssets[this.currentConstruction].width / 2;
    this.container.y =
      hexPosition.y -
      this.constructionAssets[this.currentConstruction].height / 2;
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
