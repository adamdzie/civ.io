import { app, socket, socket_id, storage } from "./app.js";

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

    //CREATE SCIENCE ICON

    const UI_SCIENCE = new PIXI.Graphics();
    UI_SCIENCE.beginFill(0x000000, 1).drawRect(0, 0, 24, 24).endFill();

    const science_texture = app.renderer.generateTexture(UI_SCIENCE);
    this.science_icon = new PIXI.Sprite(science_texture);

    this.science_icon.x = 0;
    this.science_icon.y = 0;

    // this.science_icon.pivot.x = 0;
    // this.science_icon.pivot.y = 0;

    this.science_icon.anchor.x = -0.1;
    this.science_icon.anchor.y = -0.1;

    //CREATE GOLD ICON

    const UI_GOLD = new PIXI.Graphics();
    UI_GOLD.beginFill(0x000000, 1).drawRect(0, 0, 24, 24).endFill();

    const gold_texture = app.renderer.generateTexture(UI_GOLD);
    this.gold_icon = new PIXI.Sprite(gold_texture);

    this.gold_icon.x = 0;
    this.gold_icon.y = 0;

    this.gold_icon.anchor.x = -4;
    this.gold_icon.anchor.y = -0.1;

    //CREATE POPULATION ICON

    const UI_POPULATION = new PIXI.Graphics();
    UI_POPULATION.beginFill(0x000000, 1).drawRect(0, 0, 24, 24).endFill();

    const population_texture = app.renderer.generateTexture(UI_POPULATION);
    this.population_icon = new PIXI.Sprite(population_texture);

    this.population_icon.x = 0;
    this.population_icon.y = 0;

    this.population_icon.anchor.x = -8;
    this.population_icon.anchor.y = -0.1;

    //CREATE AMENITIES ICON

    const UI_AMENITIES = new PIXI.Graphics();
    UI_AMENITIES.beginFill(0x000000, 1).drawRect(0, 0, 24, 24).endFill();

    const amenities_texture = app.renderer.generateTexture(UI_AMENITIES);
    this.amenities_icon = new PIXI.Sprite(amenities_texture);

    this.amenities_icon.x = 0;
    this.amenities_icon.y = 0;

    this.amenities_icon.anchor.x = -12;
    this.amenities_icon.anchor.y = -0.1;

    this.resources_container.addChild(this.resources_box);
    this.resources_container.addChild(this.science_icon);
    this.resources_container.addChild(this.gold_icon);
    this.resources_container.addChild(this.population_icon);
    this.resources_container.addChild(this.amenities_icon);

    app.stage.addChild(this.resources_container);
  }
  update() {
    this.resources_container.x = app.stage.pivot.x - app.renderer.width / 2 + 5;
    this.resources_container.y =
      app.stage.pivot.y - app.renderer.height / 2 + 5;
  }
}
