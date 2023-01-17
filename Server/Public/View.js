import { app, Container } from "./App.js";

class View {
  constructor() {
    this.container = new PIXI.Container();
  }
  Add(elements) {
    elements.forEach((element) => {
      this.container.addChild(element);
    });
  }
  Remove(elements) {
    elements.forEach((element) => {
      this.container.removeChild(element);
    });
  }
}

const singletonInstance = new View();
export default singletonInstance;
