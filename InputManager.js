import { app, socket, socket_id } from "./app.js";

import Storage from "./storage.js";
import UI from "./Ui.js";
import ShowConstruction from "./ShowConstruction.js";
import Grid from "./Grid.js";

class InputManager {
  constructor() {
    this.initialized = false;
  }
  initialize() {
    this.mouseMoving = false;
    this.mousePosition = { x: 0, y: 0 };
    this.mouseScreenPosition = { x: 0, y: 0 };
    this.selectedHex = { x: 0, y: 0 };
    this.showMode = false;
    this.showBuilding = "none";
    window.addEventListener("keydown", (e) => this.KeyPressed(e));
    window.addEventListener("keyup", (e) => this.KeyReleased(e));
    window.addEventListener("mousemove", (e) => this.OnMouseMove(e));
    // window.addEventListener("mousedown", (e) => {
    //   let pos = this.GetWorldPoint(e.clientX, e.clientY);
    //   console.log("POS: " + pos.x + "," + pos.y);
    // });

    this.mode = true;
    this.move_vector = { x: 0, y: 0 };
    this.input = {
      W: false,
      S: false,
      A: false,
      D: false,
      E: false,
      Digit1: false,
      Digit2: false,
      Digit3: false,
      Digit4: false,
      Digit5: false,
      Digit6: false,
      Digit7: false,
      Digit8: false,
      Digit9: false,
    };
    this.initialized = true;
  }
  KeyPressed(e) {
    //MOVEMENT INPUT SECTION

    if (
      e.code === "KeyW" ||
      e.code === "KeyS" ||
      e.code === "KeyD" ||
      e.code === "KeyA"
    ) {
      if (e.code === "KeyW") this.input.W = true;
      if (e.code === "KeyS") this.input.S = true;
      if (e.code === "KeyD") this.input.D = true;
      if (e.code === "KeyA") this.input.A = true;
      //console.log(this.GetWorldPoint(e.clientX, e.clientY));
      this.MovementController();
    }

    //MODE INPUT SECTION
    if (this.input.E === false) {
      if (e.code === "KeyE") {
        this.input.E = true;
        UI.SwitchMode();
      }
    }

    //

    if (this.input.Digit1 === false) {
      if (e.code === "Digit1") {
        this.input.Digit1 = true;
        UI.SelectSlot(
          0,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit2 === false) {
      if (e.code === "Digit2") {
        this.input.Digit2 = true;
        UI.SelectSlot(
          1,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit3 === false) {
      if (e.code === "Digit3") {
        this.input.Digit3 = true;
        UI.SelectSlot(
          2,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit4 === false) {
      if (e.code === "Digit4") {
        this.input.Digit4 = true;
        UI.SelectSlot(
          3,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit5 === false) {
      if (e.code === "Digit5") {
        this.input.Digit5 = true;
        UI.SelectSlot(
          4,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit6 === false) {
      if (e.code === "Digit6") {
        this.input.Digit6 = true;
        UI.SelectSlot(
          5,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit7 === false) {
      if (e.code === "Digit7") {
        this.input.Digit7 = true;
        UI.SelectSlot(
          6,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit8 === false) {
      if (e.code === "Digit8") {
        this.input.Digit8 = true;
        UI.SelectSlot(
          7,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
    if (this.input.Digit9 === false) {
      if (e.code === "Digit9") {
        this.input.Digit9 = true;
        UI.SelectSlot(
          8,
          this.mode,
          this.PickSlotCallback,
          this.UnpickSlotCallback
        );
      }
    }
  }

  KeyReleased(e) {
    //MOVEMENT INPUT SECTION

    if (
      e.code === "KeyW" ||
      e.code === "KeyS" ||
      e.code === "KeyD" ||
      e.code === "KeyA"
    ) {
      if (e.code === "KeyW") this.input.W = false;
      if (e.code === "KeyS") this.input.S = false;
      if (e.code === "KeyD") this.input.D = false;
      if (e.code === "KeyA") this.input.A = false;

      this.MovementController();
    }

    //MODE INPUT SECTION

    if (e.code === "KeyE") {
      this.input.E = false;
    }

    if (e.code === "Digit1") {
      this.input.Digit1 = false;
    }
    if (e.code === "Digit2") {
      this.input.Digit2 = false;
    }
    if (e.code === "Digit3") {
      this.input.Digit3 = false;
    }
    if (e.code === "Digit4") {
      this.input.Digit4 = false;
    }
    if (e.code === "Digit5") {
      this.input.Digit5 = false;
    }
    if (e.code === "Digit6") {
      this.input.Digit6 = false;
    }
    if (e.code === "Digit7") {
      this.input.Digit7 = false;
    }
    if (e.code === "Digit8") {
      this.input.Digit8 = false;
    }
    if (e.code === "Digit9") {
      this.input.Digit9 = false;
    }
  }
  MovementController() {
    if (!this.input.A && !this.input.W) this.move_vector.y = 0;
    if (!this.input.D && !this.input.A) this.move_vector.x = 0;

    if (this.input.W) this.move_vector.y = -1;
    if (this.input.S) this.move_vector.y = 1;
    if ((this.input.W && this.input.S) || (!this.input.W && !this.input.S))
      this.move_vector.y = 0;

    if (this.input.A) this.move_vector.x = -1;
    if (this.input.D) this.move_vector.x = 1;
    if ((this.input.A && this.input.D) || (!this.input.A && !this.input.D))
      this.move_vector.x = 0;

    socket.emit("movement", this.move_vector);
  }
  OnMouseMove(e) {
    this.mouseMoving = true;
    this.mousePosition = this.GetWorldPoint(e.clientX, e.clientY);
    this.mouseScreenPosition = { x: e.clientX, y: e.clientY };

    if (socket_id !== "")
      socket.emit("hero_rotation", { x: e.clientX, y: e.clientY });
  }
  GetWorldPoint(x, y) {
    return {
      x: Storage.PlayerList[socket_id].position.x - (app.stage.position.x - x),
      y: Storage.PlayerList[socket_id].position.y - (app.stage.position.y - y),
    };
  }
  SwitchMode() {
    this.mode = !this.mode;
    this.UnpickSlotCallback();
  }
  Update() {
    this.UpdateMouse();
    if (this.showMode) this.ShowMode();

    //console.log(this.selectedHex);
  }
  UpdateMouse() {
    if (!this.mouseMoving) {
      this.mousePosition = this.GetWorldPoint(
        this.mouseScreenPosition.x,
        this.mouseScreenPosition.y
      );
    }
    //console.log(this.mousePosition);
    this.mouseMoving = false;
  }
  SelectHex() {
    //console.log(ui.active_slot);
    if (!this.mode) {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
          if (
            Grid.map[[i, j]].IsCollide(
              new SAT.Vector(this.mousePosition.x, this.mousePosition.y)
            )
          )
            this.selectedHex = Grid.map[[i, j]];
        }
      }
    }
  }
  PickSlotCallback(active_slot) {
    if (active_slot === 0) singletonInstance.showBuilding = "City";
    singletonInstance.showMode = true;
  }
  UnpickSlotCallback() {
    singletonInstance.showMode = false;
    ShowConstruction.DisableShow();
  }
  ShowMode() {
    this.SelectHex();
    ShowConstruction.Show(this.showBuilding, {
      x: this.selectedHex.container.position.x + Grid.edgeLength,
      y: this.selectedHex.container.position.y + Grid.h,
    });
  }
}

const singletonInstance = new InputManager();

export default singletonInstance;
