import { app, socket, socket_id, storage, ui } from "./app.js";

export class InputManager {
  constructor() {
    window.addEventListener("keydown", (e) => this.KeyPressed(e));
    window.addEventListener("keyup", (e) => this.KeyReleased(e));
    window.addEventListener("mousemove", (e) => this.OnMouseMove(e));

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

      this.MovementController();
    }

    //MODE INPUT SECTION
    if (this.input.E === false) {
      if (e.code === "KeyE") {
        this.input.E = true;
        ui.SwitchMode();
      }
    }

    //

    if (this.input.Digit1 === false) {
      if (e.code === "Digit1") {
        this.input.Digit1 = true;
        ui.SelectSlot(0, this.mode);
      }
    }
    if (this.input.Digit2 === false) {
      if (e.code === "Digit2") {
        this.input.Digit2 = true;
        ui.SelectSlot(1, this.mode);
      }
    }
    if (this.input.Digit3 === false) {
      if (e.code === "Digit3") {
        this.input.Digit3 = true;
        ui.SelectSlot(2, this.mode);
      }
    }
    if (this.input.Digit4 === false) {
      if (e.code === "Digit4") {
        this.input.Digit4 = true;
        ui.SelectSlot(3, this.mode);
      }
    }
    if (this.input.Digit5 === false) {
      if (e.code === "Digit5") {
        this.input.Digit5 = true;
        ui.SelectSlot(4, this.mode);
      }
    }
    if (this.input.Digit6 === false) {
      if (e.code === "Digit6") {
        this.input.Digit6 = true;
        ui.SelectSlot(5, this.mode);
      }
    }
    if (this.input.Digit7 === false) {
      if (e.code === "Digit7") {
        this.input.Digit7 = true;
        ui.SelectSlot(6, this.mode);
      }
    }
    if (this.input.Digit8 === false) {
      if (e.code === "Digit8") {
        this.input.Digit8 = true;
        ui.SelectSlot(7, this.mode);
      }
    }
    if (this.input.Digit9 === false) {
      if (e.code === "Digit9") {
        this.input.Digit9 = true;
        ui.SelectSlot(8, this.mode);
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
    if (socket_id !== "")
      socket.emit("hero_rotation", { x: e.clientX, y: e.clientY });
  }
  GetWorldPoint(x, y) {
    return {
      x: storage.PlayerList[socket_id].position.x - (app.stage.position.x - x),
      y: storage.PlayerList[socket_id].position.y - (app.stage.position.y - y),
    };
  }
  SwitchMode() {
    this.mode = !this.mode;
  }
}
