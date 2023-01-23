import Enums from "./Enums.js";
import { makeStruct } from "./Functions.js";
class Deserializer {
  static MovementInput(buffer) {
    let view = new Int8Array(buffer);

    return { x: view[0], y: view[1] };
  }
  static Initialize(buffer) {
    let dataview = new DataView(buffer);

    let width = dataview.getUint16(0);
    let height = dataview.getUint16(2);
    let edgeLength = dataview.getUint16(4);

    let i = 0;
    let j = 0;
    let pointer = 6;

    let map = {};

    while (i < width) {
      let terrainType = Enums.terrain[dataview.getUint8(pointer)];
      pointer++;
      let terrainObstacle = Enums.obstacle[dataview.getUint8(pointer)];
      pointer++;
      let terrainResource = Enums.resource[dataview.getUint8(pointer)];
      pointer++;
      let hexOwner = dataview.getUint8(pointer);
      pointer++;

      map[[i, j]] = {
        terrainType: terrainType,
        terrainObstacle: terrainObstacle,
        terrainResource: terrainResource,
        hexOwner: hexOwner,
      };

      j++;
      if (j >= height) {
        j = 0;
        i++;
      }
    }

    let cities_length = dataview.getUint16(pointer);
    pointer += 2;
    let buildings_length = dataview.getUint16(pointer);
    pointer += 2;

    let cities = [];
    for (let i = 0; i < cities_length; i++) {
      let ownerId = dataview.getUint8(pointer);
      pointer++;
      let hexCord_x = dataview.getUint8(pointer);
      pointer++;
      let hexCord_y = dataview.getUint8(pointer);
      pointer++;
      let isBuilt = dataview.getUint8(pointer);
      pointer++;
      let ownedHexes_length = dataview.getUint8(pointer);
      pointer++;
      let ownedHexes = [];

      for (let i = 0; i < ownedHexes_length; i++) {
        let ownedHex_x = dataview.getUint8(pointer);
        pointer++;
        let ownedHex_y = dataview.getUint8(pointer);
        pointer++;

        ownedHexes.push({ x: ownedHex_x, y: ownedHex_y });
      }
      cities.push({
        ownerId: ownerId,
        hexCord: { x: hexCord_x, y: hexCord_y },
        isBuilt: isBuilt,
        ownedHexes: ownedHexes,
      });
    }

    let buildings = [];

    for (let i = 0; i < buildings_length; i++) {
      let ownerId = dataview.getUint8(pointer);
      pointer++;
      let hexCord_x = dataview.getUint8(pointer);
      pointer++;
      let hexCord_y = dataview.getUint8(pointer);
      pointer++;
      let isBuilt = dataview.getUint8(pointer);
      pointer++;
      buildings.push({
        ownerId: ownerId,
        hexCord: { x: hexCord_x, y: hexCord_y },
        isBuilt: isBuilt,
      });
    }

    let players_length = dataview.getUint8(pointer);
    pointer++;
    let players = [];
    for (let i = 0; i < players_length; i++) {
      let player_id = dataview.getUint8(pointer);
      pointer++;
      let position_x = dataview.getFloat32(pointer);
      pointer += 4;
      let position_y = dataview.getFloat32(pointer);
      pointer += 4;
      let rotation = dataview.getFloat32(pointer);
      pointer += 4;

      players.push({
        id: player_id,
        position: { x: position_x, y: position_y },
        rotation: rotation,
      });
    }

    let id = dataview.getUint8(pointer);

    return {
      grid: { width: width, height: height, edgeLength: edgeLength, map: map },
      players: players,
      cities: cities,
      buildings: buildings,
      id: id,
    };
  }
  static AddPlayer(buffer) {
    let dataview = new DataView(buffer);

    return {
      id: dataview.getUint8(0),
      position: { x: dataview.getFloat32(1), y: dataview.getFloat32(5) },
      rotation: dataview.getFloat32(9),
    };
  }

  static Rotation(buffer) {
    let dataview = new DataView(buffer);

    return {
      id: dataview.getUint8(0),
      time: dataview.getFloat64(1),
      angle: dataview.getFloat32(9),
    };
  }
  static Movement(buffer) {
    let dataview = new DataView(buffer);

    return {
      id: dataview.getUint8(0),
      time: dataview.getFloat64(1),
      position: { x: dataview.getFloat32(9), y: dataview.getFloat32(13) },
    };
  }
  static Build(buffer) {
    let dataview = new DataView(buffer);

    return {
      id: dataview.getUint8(0),
      type: dataview.getUint8(1),
      hexCord: { x: dataview.getUint8(2), y: dataview.getUint8(3) },
    };
  }
  static BuildingComplete(buffer) {
    let dataview = new DataView(buffer);

    return { x: dataview.getUint8(0), y: dataview.getUint8(1) };
  }
  static CityGrow(buffer) {
    let dataview = new DataView(buffer);

    return {
      hexCord: { x: dataview.getUint8(0), y: dataview.getUint8(1) },
      growHexCord: { x: dataview.getUint8(2), y: dataview.getUint8(3) },
    };
  }
}

export default Deserializer;
