import City from "./City.js";
import Grid from "../Grid.js";
class BuildingFactory {
  static Build(id, type, hexCord, isBuilt) {
    if (type === 0) return new City(id, hexCord, isBuilt);
  }
}

export default BuildingFactory;
