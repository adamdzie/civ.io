class Deserializer {
  static Movement(buffer) {
    let view = new Int8Array(buffer);

    return { x: view[0], y: view[1] };
  }
  static Rotation(buffer) {
    return { x: buffer.readUint16BE(0), y: buffer.readUint16BE(2) };
  }
  static Build(buffer) {
    return {
      hexCord: { x: buffer.readUint8(0), y: buffer.readUint8(1) },
      type: buffer.readUint8(2),
    };
  }
}
module.exports = Deserializer;
