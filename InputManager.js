import { app, socket, socket_id, storage } from "./app.js";

export class InputManager {
  constructor() {
    window.addEventListener("keydown", (e) => this.KeyPressed(e));
    window.addEventListener("keyup", (e) => this.KeyReleased(e));
    window.addEventListener("mousemove", (e) => this.OnMouseMove(e));
    this.move_vector = { x: 0, y: 0 };
    this.input = {
      W: false,
      S: false,
      A: false,
      D: false,
    };
  }
  KeyPressed(e) {
    if (e.code === "KeyW") this.input.W = true;
    if (e.code === "KeyS") this.input.S = true;
    if (e.code === "KeyD") this.input.D = true;
    if (e.code === "KeyA") this.input.A = true;

    this.InputController();
  }
  KeyReleased(e) {
    if (e.code === "KeyW") this.input.W = false;
    if (e.code === "KeyS") this.input.S = false;
    if (e.code === "KeyD") this.input.D = false;
    if (e.code === "KeyA") this.input.A = false;

    this.InputController();
  }
  InputController() {
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
    if (socket_id !== "") {
      let mouse_pos = this.GetWorldPoint(e.clientX, e.clientY);

      socket.emit("hero_rotation", { x: e.clientX, y: e.clientY });
    }
  }
  GetWorldPoint(x, y) {
    return {
      x: storage.PlayerList[socket_id].position.x - (app.stage.position.x - x),
      y: storage.PlayerList[socket_id].position.y - (app.stage.position.y - y),
    };
  }
}
