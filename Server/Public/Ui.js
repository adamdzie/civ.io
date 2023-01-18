import { app, socket_id, ratio, ratio_x, ratio_y } from "./App.js";

import InputManager from "./InputManager.js";
import Resources from "./Resources.js";
import Storage from "./Storage.js";

class UI {
  constructor() {
    this.initialized = false;
    this.mode_build;
  }
  initialize() {
    this.active_slot = -1;
    this.icon_offset = 15;
    //CREATE CONTAINERS

    this.main_container = new PIXI.Container();
    this.main_container.x = 0;
    this.main_container.y = 0;

    this.resources_container = new PIXI.Container();
    this.resources_container.x = 5;
    this.resources_container.y = 5;

    this.mode_container = new PIXI.Container();

    this.mode_container.x = 10;
    this.mode_container.y = app.renderer.height - 70;

    this.combat_container = new PIXI.Container();

    this.combat_container.x = 100;
    this.combat_container.y = app.renderer.height - 70;

    this.build_container = new PIXI.Container();

    this.build_container.x = 100;
    this.build_container.y = app.renderer.height - 70;

    this.build_container.visible = false;

    //CREATE RESOURCES BOX

    const UI_RESOURCES = new PIXI.Graphics();
    UI_RESOURCES.beginFill(0x000000, 0.1).drawRect(0, 0, 410, 30).endFill();

    const resource_texture = app.renderer.generateTexture(UI_RESOURCES);
    this.resources_box = new PIXI.Sprite(resource_texture);

    this.resources_box.x = 0;
    this.resources_box.y = 0;

    //CREATE GOLD ICON

    this.gold_icon = new PIXI.Sprite(Resources.assets["Icon_gold"]);

    this.gold_icon.x = 5;
    this.gold_icon.y = 4;

    //CREATE SCIENCE ICON

    this.science_icon = new PIXI.Sprite(Resources.assets["Icon_science"]);

    this.science_icon.x = 120;
    this.science_icon.y = 3;

    //CREATE POPULATION ICON

    this.population_icon = new PIXI.Sprite(Resources.assets["Icon_people"]);

    this.population_icon.x = 235;
    this.population_icon.y = 3;

    //CREATE AMENITIES ICON
    this.amenities_icon = new PIXI.Sprite(Resources.assets["Icon_mask"]);

    this.amenities_icon.x = 350;
    this.amenities_icon.y = 4;

    //TEXT FOR RESOURCES

    //GOLD QUANTITY

    this.gold_quantity = new PIXI.Text(Storage.PlayerList[socket_id].gold, {
      fill: 0xffd700,
      fontSize: 17,
      fontWeight: "bold",
      stroke: "black",
      strokeThickness: 2.5,
      letterSpacing: 1,
    });

    this.gold_quantity.x = 32;
    this.gold_quantity.y = 4;

    //GOLD INCOME

    this.gold_income = new PIXI.Text(
      "+" + Storage.PlayerList[socket_id].goldIncome,
      {
        fill: 0x999999,
        fontSize: 14,
        fontWeight: "bold",
        stroke: "black",
        strokeThickness: 2.5,
        letterSpacing: 1,
      }
    );

    this.gold_income.x = this.gold_quantity.x + this.gold_quantity.width;
    this.gold_income.y = 0;

    //SCIENCE QUANTITY

    this.science_quantity = new PIXI.Text(
      Storage.PlayerList[socket_id].science,
      {
        fill: 0x4392d2,
        fontSize: 17,
        fontWeight: "bold",
        stroke: "black",
        strokeThickness: 2.5,
        letterSpacing: 1,
      }
    );

    this.science_quantity.x = 146;
    this.science_quantity.y = 4;

    //SCIENCE INCOME

    this.science_income = new PIXI.Text(
      "+" + Storage.PlayerList[socket_id].scienceIncome,
      {
        fill: 0x999999,
        fontSize: 14,
        fontWeight: "bold",
        stroke: "black",
        strokeThickness: 2.5,
        letterSpacing: 1,
      }
    );

    this.science_income.x =
      this.science_quantity.x + this.science_quantity.width;
    this.science_income.y = 0;

    //POPULATION QUANTITY

    this.population_quantity = new PIXI.Text(
      Storage.PlayerList[socket_id].population,
      {
        fill: 0x36a800,
        fontSize: 17,
        fontWeight: "bold",
        stroke: "black",
        strokeThickness: 2.5,
        letterSpacing: 1,
      }
    );

    this.population_quantity.x = 260;
    this.population_quantity.y = 4;

    //POPULATION INCOME

    this.population_income = new PIXI.Text(
      "+" + Storage.PlayerList[socket_id].populationIncome,
      {
        fill: 0x999999,
        fontSize: 14,
        fontWeight: "bold",
        stroke: "black",
        strokeThickness: 2.5,
        letterSpacing: 1,
      }
    );

    this.population_income.x =
      this.population_quantity.x + this.population_quantity.width;
    this.population_income.y = 0;

    //AMENITIES QUANTITY

    this.amenities_quantity = new PIXI.Text(
      Storage.PlayerList[socket_id].amenities,
      {
        fill: 0xd0d0d0,
        fontSize: 17,
        fontWeight: "bold",
        stroke: "black",
        strokeThickness: 2.5,
        letterSpacing: 1,
      }
    );

    this.amenities_quantity.x = 375;
    this.amenities_quantity.y = 4;

    //MODE BACKGROUND

    let grap = new PIXI.Graphics();
    grap.beginFill(0x000000, 0.1).drawRect(0, 0, 60, 60).endFill();

    let texty = app.renderer.generateTexture(grap);
    this.mode_background = new PIXI.Sprite(texty);

    this.mode_background.x = 0;
    this.mode_background.y = 0;

    //COMBAT MODE

    let grap_1 = new PIXI.Graphics();
    grap_1.beginFill(0x78072f, 1).drawRect(0, 0, 50, 50).endFill();

    let texty_1 = app.renderer.generateTexture(grap_1);
    this.mode_combat = new PIXI.Sprite(texty_1);

    this.mode_combat.x = 5;
    this.mode_combat.y = 5;

    this.mode_combat.interactive = true;

    //BUILDING MODE

    let grap_2 = new PIXI.Graphics();
    grap_2.beginFill(0x073a78, 1).drawRect(0, 0, 50, 50).endFill();

    let texty_2 = app.renderer.generateTexture(grap_2);
    this.mode_build = new PIXI.Sprite(texty_2);

    this.mode_build.x = 5;
    this.mode_build.y = 5;

    this.mode_build.interactive = true;

    this.mode_build.visible = false;

    //INTERACTIVE MODES

    this.mode_combat.on("pointerdown", () => this.SwitchMode());

    this.mode_build.on("pointerdown", () => this.SwitchMode());

    //MODE CONTAINERS

    let grap_3 = new PIXI.Graphics();
    grap_3.beginFill(0x000000, 0.1).drawRect(0, 0, 60, 60).endFill();

    let texty_3 = app.renderer.generateTexture(grap_3);

    this.combat_slots = [];
    this.combat_slots[0] = new PIXI.Sprite(texty_3);

    this.combat_slots[1] = new PIXI.Sprite(texty_3);

    this.combat_slots[1].x = 100;

    this.combat_slots[2] = new PIXI.Sprite(texty_3);

    this.combat_slots[2].x = 200;

    this.build_slots = [];

    this.build_slots[0] = new PIXI.Sprite(texty_3);

    this.build_slots[1] = new PIXI.Sprite(texty_3);

    this.build_slots[1].x = 100;

    this.build_slots[2] = new PIXI.Sprite(texty_3);

    this.build_slots[2].x = 200;

    this.build_slots[3] = new PIXI.Sprite(texty_3);

    this.build_slots[3].x = 300;

    this.build_slots[4] = new PIXI.Sprite(texty_3);

    this.build_slots[4].x = 400;

    this.build_slots[5] = new PIXI.Sprite(texty_3);

    this.build_slots[5].x = 500;

    //FILL CONTAINERS

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

    this.mode_container.addChild(this.mode_background);
    this.mode_container.addChild(this.mode_combat);
    this.mode_container.addChild(this.mode_build);

    this.combat_container.addChild(this.combat_slots[0]);
    this.combat_container.addChild(this.combat_slots[1]);
    this.combat_container.addChild(this.combat_slots[2]);

    this.build_container.addChild(this.build_slots[0]);
    this.build_container.addChild(this.build_slots[1]);
    this.build_container.addChild(this.build_slots[2]);
    this.build_container.addChild(this.build_slots[3]);
    this.build_container.addChild(this.build_slots[4]);
    this.build_container.addChild(this.build_slots[5]);

    this.main_container.addChild(this.resources_container);
    this.main_container.addChild(this.mode_container);
    this.main_container.addChild(this.combat_container);
    this.main_container.addChild(this.build_container);

    app.stage.addChild(this.main_container);

    this.temporary = true;

    this.initialized = true;
  }
  update() {
    this.main_container.x = app.stage.pivot.x - app.renderer.width / 2;
    this.main_container.y = app.stage.pivot.y - app.renderer.height / 2;

    // this.resources_container.x = app.stage.pivot.x - app.renderer.width / 2 + 0;
    // this.resources_container.y =
    //   app.stage.pivot.y - app.renderer.height / 2 + 0;
    // this.resources_container.scale.x = this.resources_container.scale.y = 0.5;
  }
  SwitchMode() {
    this.mode_build.visible = !this.mode_build.visible;
    this.build_container.visible = !this.build_container.visible;
    this.combat_container.visible = !this.combat_container.visible;

    if (this.active_slot !== -1) {
      if (InputManager.mode) {
        if (typeof this.combat_slots[this.active_slot] !== "undefined") {
          this.combat_slots[this.active_slot].y += this.icon_offset;
        }
      } else {
        if (typeof this.build_slots[this.active_slot] !== "undefined") {
          this.build_slots[this.active_slot].y += this.icon_offset;
        }
      }
    }

    this.active_slot = -1;
    InputManager.SwitchMode();
  }
  SelectSlot(index, mode, OnCallback, OffCallback) {
    if (!mode) {
      if (this.active_slot === index) {
        this.build_slots[this.active_slot].y += this.icon_offset;
        this.active_slot = -1;
        OffCallback();
        return;
      }

      if (typeof this.build_slots[index] !== "undefined") {
        if (!(this.active_slot === -1)) {
          this.build_slots[this.active_slot].y += this.icon_offset;
          //Select slot callback
        }
        this.active_slot = index;
        this.build_slots[this.active_slot].y -= this.icon_offset;
        OnCallback(this.active_slot);
      }
    } else {
      if (this.active_slot === index) {
        this.combat_slots[this.active_slot].y += this.icon_offset;
        this.active_slot = -1;
        return;
      }

      if (typeof this.combat_slots[index] !== "undefined") {
        if (!(this.active_slot === -1)) {
          this.combat_slots[this.active_slot].y += this.icon_offset;
        }
        this.active_slot = index;
        this.combat_slots[this.active_slot].y -= this.icon_offset;
      }
    }
  }

  Resize() {
    let temp_ratio = ratio * 0.9;
    this.main_container.scale.x = this.main_container.scale.y = temp_ratio;
    this.mode_container.y =
      this.combat_container.y =
      this.build_container.y =
        app.renderer.height / temp_ratio - 70;
  }
}

const singletonInstance = new UI();

export default singletonInstance;
