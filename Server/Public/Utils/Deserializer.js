import Enums from "./Enums.js";
import { makeStruct } from "./Functions.js";
class Deserializer {
  static MovementInput(buffer) {
    let view = new Int8Array(buffer);

    return { x: view[0], y: view[1] };
  }
  static Grid(buffer) {
    let dataview = new DataView(buffer);

    let width = dataview.getUint16(0);
    let height = dataview.getUint16(2);
    let edgeLength = dataview.getUint16(4);

    let i = 0;
    let j = 0;
    let pointer = 6;

    let map = {};
    let hex = new makeStruct(
      "terrainType, terrainObstacle, terrainResource, hexOwner"
    );

    while (i < width) {
      let terrainType = Enums.terrain[dataview.getUint8(pointer)];
      pointer++;
      let terrainObstacle = Enums.obstacle[dataview.getUint8(pointer)];
      pointer++;
      let terrainResource = Enums.resource[dataview.getUint8(pointer)];
      pointer++;
      let hexOwner = dataview.getUint8(pointer);
      pointer++;

      map[[i, j]] = new hex(
        terrainType,
        terrainObstacle,
        terrainResource,
        hexOwner
      );
      j++;
      if (j >= height) {
        j = 0;
        i++;
      }
    }

    return { width: width, height: height, edgeLength: edgeLength, map: map };
  }
}

export default Deserializer;
