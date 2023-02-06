import City from "./City.js";
import Building from "./Building.js";
import Bank from "./Bank.js";
import Lab from "./Lab.js";
import House from "./House.js";
import Amphitheatre from "./Amphitheatre.js";
import Grid from "../Grid.js";
import { getRing } from "../Utils/Functions.js";
import Enums from "../Utils/Enums.js";
class BuildingFactory {
  static BuildCity(id, hexCord, isBuilt, ownedHexes) {
    return new City(id, hexCord, isBuilt, ownedHexes);
  }
  static Build(id, type, hexCord, isBuilt) {
    if (type === 0) {
      let ownedHexes = [hexCord];
      ownedHexes = ownedHexes.concat(getRing(hexCord, 1));
      return new City(id, hexCord, isBuilt, ownedHexes);
    } else if (type === 1) {
      return new Bank(id, hexCord, isBuilt);
    } else if (type === 2) {
      return new Lab(id, hexCord, isBuilt);
    } else if (type === 3) {
      return new House(id, hexCord, isBuilt);
    } else if (type === 4) {
      return new Amphitheatre(id, hexCord, isBuilt);
    }
  }
}

export default BuildingFactory;
