import { Graphics, Text, app } from "../App.js";
import Grid from "../Grid.js";
import Resources from "../Resources.js";
import Storage from "../Storage.js";
import View from "../View.js";
class Building {
  constructor(ownerId, hexCord, type, isBuilt) {
    this.ownerId = ownerId;
    this.hexCord = hexCord;
    this.isBuilt = isBuilt;
    this.hexWidth = Grid.map[[0, 0]].edgeLength * 2;
    this.hexHeight = Grid.map[[0, 0]].h * 2;

    this.constructionSprite = new PIXI.Sprite(Resources.assets["Construction"]);
    //TEMPORARY FOR ALL BUILDINGS
    //this.sprite = new PIXI.Sprite(Resources.assets[type]);
    this.sprite = new PIXI.Sprite(Resources.assets["City"]);

    this.nameSprite = new PIXI.Text(type, {
      fill: 0x000000,
      fontSize: 14,
      //fontWeight: "bold",
      //stroke: "black",
      //strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.container = new PIXI.Container();

    if (isBuilt) {
      this.container.addChild(this.sprite);
      this.container.addChild(this.nameSprite);
    } else this.container.addChild(this.constructionSprite);

    this.nameSprite.x += this.container.width / 2 - this.nameSprite.width / 2;
    this.nameSprite.y += 5;
    this.hexPosition = Grid.map[[hexCord.x, hexCord.y]].position;

    this.hexPosition.x += Grid.map[[0, 0]].edgeLength;
    this.hexPosition.y += Grid.map[[0, 0]].h;

    this.container.x = this.hexPosition.x - 100 / 2;
    this.container.y = this.hexPosition.y - 100 / 2;

    View.Add([this.container]);

    Storage.PlayerList[this.ownerId].buildings[
      [this.hexCord.x, this.hexCord.y]
    ] = this;
    if (this.constructor.name === "City")
      Storage.PlayerList[this.ownerId].citiesCords[
        [this.hexCord.x, this.hexCord.y]
      ] = this.hexCord;
  }
  complete() {
    this.isBuilt = true;

    this.container.removeChild(this.constructionSprite);
    this.constructionSprite = null;

    this.container.addChild(this.sprite);
    this.container.addChild(this.nameSprite);
  }
  grow() {}
}

export default Building;
