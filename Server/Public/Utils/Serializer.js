class Serializer {
  static MovementInput(x, y) {
    let buffer = new ArrayBuffer(2);
    let view = new Int8Array(buffer);

    view[0] = x;
    view[1] = y;

    return buffer;
  }
  static Rotation(x, y) {
    let buffer = new ArrayBuffer(4);

    let dataview = new DataView(buffer);

    dataview.setUint16(0, x);
    dataview.setUint16(2, y);

    return buffer;
  }
  static Build(hexCord, active_slot) {
    let buffer = new ArrayBuffer(3);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, hexCord.x);
    dataview.setUint8(1, hexCord.y);
    dataview.setUint8(2, active_slot);

    return buffer;
  }
}

export default Serializer;
