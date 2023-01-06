import { app, socket, socket_id, storage, resources } from "./app.js";

export class UI {
  constructor() {
    this.resources_container = new PIXI.Container();
    //CREATE RESOURCES BOX

    const UI_RESOURCES = new PIXI.Graphics();
    UI_RESOURCES.beginFill(0x000000, 0.1).drawRect(0, 0, 400, 30).endFill();

    const resource_texture = app.renderer.generateTexture(UI_RESOURCES);
    this.resources_box = new PIXI.Sprite(resource_texture);

    this.resources_box.x = 0;
    this.resources_box.y = 0;
    this.resources_box.anchor.x = 0;
    this.resources_box.anchor.y = 0;

    //CREATE GOLD ICON

    this.gold_icon = new PIXI.Sprite(resources.assets["Icon_gold"]);

    this.gold_icon.anchor.x = -0.1;
    this.gold_icon.anchor.y = -0.1;

    //CREATE SCIENCE ICON

    this.science_icon = new PIXI.Sprite(resources.assets["Icon_science"]);

    this.science_icon.anchor.x = -4.4;
    this.science_icon.anchor.y = -0.1;

    //CREATE POPULATION ICON

    this.population_icon = new PIXI.Sprite(resources.assets["Icon_people"]);

    this.population_icon.anchor.x = -8.4;
    this.population_icon.anchor.y = -0.1;

    //CREATE AMENITIES ICON
    this.amenities_icon = new PIXI.Sprite(resources.assets["Icon_mask"]);

    this.amenities_icon.anchor.x = -12.4;
    this.amenities_icon.anchor.y = -0.1;

    //TEXT FOR RESOURCES

    //GOLD QUANTITY

    this.gold_quantity = new PIXI.Text("21", {
      fill: 0xffd700,
      fontSize: 17,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.gold_quantity.x = 30;
    this.gold_quantity.y = 4;

    //GOLD INCOME

    this.gold_income = new PIXI.Text("+5", {
      fill: 0x999999,
      fontSize: 14,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.gold_income.x = 30 + this.gold_quantity.text.length * 12;
    this.gold_income.y = 0;

    //SCIENCE QUANTITY

    this.science_quantity = new PIXI.Text("321", {
      fill: 0x4392d2,
      fontSize: 17,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.science_quantity.x = 133;
    this.science_quantity.y = 4;

    //SCIENCE INCOME

    this.science_income = new PIXI.Text("+4", {
      fill: 0x999999,
      fontSize: 14,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.science_income.x = 133 + this.science_quantity.text.length * 12;
    this.science_income.y = 0;

    //POPULATION QUANTITY

    this.population_quantity = new PIXI.Text("5k", {
      fill: 0x36a800,
      fontSize: 17,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.population_quantity.x = 229;
    this.population_quantity.y = 4;

    //POPULATION INCOME

    this.population_income = new PIXI.Text("+1k", {
      fill: 0x999999,
      fontSize: 14,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.population_income.x = 229 + this.population_quantity.text.length * 12;
    this.population_income.y = 0;

    //AMENITIES QUANTITY

    this.amenities_quantity = new PIXI.Text("0", {
      fill: 0xd0d0d0,
      fontSize: 17,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.amenities_quantity.x = 327;
    this.amenities_quantity.y = 4;

    //AMENITIES INCOME

    this.amenities_income = new PIXI.Text("+0", {
      fill: 0x999999,
      fontSize: 14,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.amenities_income.x = 327 + this.amenities_quantity.text.length * 12;
    this.amenities_income.y = 0;

    //BUILDING CONTAINERS

    this.resources_container.addChild(this.resources_box);
    this.resources_container.addChild(this.gold_icon);
    this.resources_container.addChild(this.gold_quantity);
    this.resources_container.addChild(this.gold_income);
    this.resources_container.addChild(this.science_icon);
    this.resources_container.addChild(this.science_quantity);
    this.resources_container.addChild(this.science_income);
    this.resources_container.addChild(this.population_icon);
    this.resources_container.addChild(this.population_quantity);
    this.resources_container.addChild(this.population_income);
    this.resources_container.addChild(this.amenities_icon);
    this.resources_container.addChild(this.amenities_quantity);
    this.resources_container.addChild(this.amenities_income);

    app.stage.addChild(this.resources_container);
  }
  update() {
    this.resources_container.x = app.stage.pivot.x - app.renderer.width / 2 + 5;
    this.resources_container.y =
      app.stage.pivot.y - app.renderer.height / 2 + 5;
    //this.resources_container.scale.x = this.resources_container.scale.y = 0.5;
  }
}
