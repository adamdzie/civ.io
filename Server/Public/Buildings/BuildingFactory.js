import City from "./City.js";
import Grid from "../Grid.js";
class BuildingFactory {
  static BuildCity(id, hexCord, isBuilt, ownedHexes) {
    return new City(id, hexCord, isBuilt, ownedHexes);
  }
  static Build(id, hexCord, isBuilt) {
    //TODO OTHER BUILDINGS
  }
}

export default BuildingFactory;
