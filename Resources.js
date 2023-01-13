import { app, socket, socket_id } from "./App.js";

class Resources {
  constructor() {}
  initialize() {
    //LOAD RESOURCES

    this.assets = {};

    let resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_POTATO.png");
    this.assets["Potato"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_BANANA.png");
    this.assets["Banana"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_SHEEP.png");
    this.assets["Sheep"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_COAL.png");
    this.assets["Coal"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_HEMP.png");
    this.assets["Hemp"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_WHEAT.png");
    this.assets["Wheat"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_SALT.png");
    this.assets["Salt"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_TOMATO.png");
    this.assets["Tomato"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_FISH.png");
    this.assets["Fish"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_SHRIMP.png");
    this.assets["Shrimp"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_CRAB.png");
    this.assets["Crab"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_CLAM.png");
    this.assets["Clam"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_OTTER.png");
    this.assets["Otter"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_SEAL.png");
    this.assets["Seal"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_PENGUIN.png");
    this.assets["Penguin"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_DIAMOND.png");
    this.assets["Diamond"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_MARBLE.png");
    this.assets["Marble"] = resource;

    resource = PIXI.Texture.from("./Assets/Resources/RESOURCE_SULFUR.png");
    this.assets["Sulfur"] = resource;

    resource = PIXI.Texture.from("./Assets/Icons/ICON_GOLD.png");
    this.assets["Icon_gold"] = resource;

    resource = PIXI.Texture.from("./Assets/Icons/ICON_SCIENCE.png");
    this.assets["Icon_science"] = resource;

    resource = PIXI.Texture.from("./Assets/Icons/ICON_PEOPLE.png");
    this.assets["Icon_people"] = resource;

    resource = PIXI.Texture.from("./Assets/Icons/ICON_MASK.png");
    this.assets["Icon_mask"] = resource;

    let grap = new PIXI.Graphics();
    grap
      .beginFill(0x42b7df, 0.2)
      .lineStyle(3, 0x000000, 0.2)
      .drawRect(0, 0, 100, 100)
      .endFill();

    let texture = app.renderer.generateTexture(grap);

    this.assets["City_temp"] = new PIXI.Sprite(texture);
  }
}

const singletonInstance = new Resources();

export default singletonInstance;
