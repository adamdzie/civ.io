class Deserializer {
  static MovementInput(buffer) {
    let view = new Int8Array(buffer);

    return { x: view[0], y: view[1] };
  }
  static Grid(buffer) {
    let dataview = new DataView(buffer);

    let width = dataview.getUint16(0, width);
    let height = dataview.getUint16(2, height);
    let edgeLength = dataview.getUint16(4, edgeLength);

    let i = 0;
    let j = 0;
    let pointer = 6;

    let map = {};
    while (i < width) {
      map[[i, j]].terrainType = dataview.getUint8(pointer);
      pointer++;
      map[[i, j]].terrainObstacle = dataview.getUint8(pointer);
      pointer++;
      map[[i, j]].terrainResource = dataview.getUint8(pointer);
      pointer++;
      map[[i, j]].hexOwner = dataview.getUint8(pointer);
      pointer++;
      j++;
      if (j >= height) {
        j = 0;
        i++;
      }
    }
  }
}
module.exports = Deserializer;
