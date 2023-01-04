import { Queue } from "../DataStructures/Queue.js";

export class Interpolator {
  constructor(position, rotation) {
    //POSITION SECTION
    this.buffer = new Queue();
    this.elapsedTime = 0;
    this.currentPosition = position;
    this.fillStart = false;

    this.past = { time: 0, x: 0, y: 0 };
    this.current = { time: 0, x: 0, y: 0 };

    this.timeAdd = 16;

    //ROTATION SECTION
    this.buffer_rotation = new Queue();
    this.elapsedTimeRotation = 0;
    this.currentAngle = rotation;
    this.fillStartRotation = false;

    this.pastRotation = { time: 0, angle: 0 };
    this.currentRotation = { time: 0, angle: 0 };

    this.rotationThreshold = 0.2;
    this.timeAddRotation = 16;
  }

  UpdateInterpolator(delta) {
    this.CheckStartFill();
    this.CheckStartFillRotation();
    this.Refresh(delta);
    this.RefreshRotation(delta);
  }
  //---------------//
  //POSITION SECTION
  //---------------//

  HandleNewTick(time_position) {
    this.buffer.enqueue(time_position);
  }
  Refresh(delta) {
    if (!this.fillStart) return false;

    this.elapsedTime += this.timeAdd;

    if (this.elapsedTime + this.past.time >= this.current.time) {
      if (this.buffer.length > 0) {
        this.elapsedTime = 0;
        this.past = this.current;
        this.current = this.buffer.dequeue();
        this.timeAdd = (this.current.time - this.past.time) / 2;
      }
    }

    if (this.past.x === this.current.x && this.past.y === this.current.y) {
      this.fillStart = false;
      this.currentPosition = { x: this.current.x, y: this.current.y };
      this.timeAdd = 16;
      return;
    }

    let posX =
      ((this.current.x - this.past.x) * this.elapsedTime) /
        (this.current.time - this.past.time) +
      this.past.x;
    let posY =
      ((this.current.y - this.past.y) * this.elapsedTime) /
        (this.current.time - this.past.time) +
      this.past.y;

    this.currentPosition = { x: posX, y: posY };
  }

  CheckStartFill() {
    if (this.fillStart) return;

    if (this.buffer.length > 0) {
      this.current = this.buffer.dequeue();
      this.past.time = this.current.time - 33;
      this.elapsedTime = 0;
      this.fillStart = true;
    }
  }

  //---------------//
  //ROTATION SECTION
  //---------------//

  CheckStartFillRotation() {
    if (this.fillStartRotation) return;

    if (this.buffer_rotation.length > 0) {
      this.currentRotation = this.buffer_rotation.dequeue();
      this.pastRotation.time = this.currentRotation.time - 33;
      this.elapsedTimeRotation = 0;
      this.fillStartRotation = true;
    }
  }

  HandleNewRotationTick(time_rotation) {
    this.buffer_rotation.enqueue(time_rotation);
  }

  RefreshRotation(delta) {
    if (!this.fillStartRotation) return false;

    this.elapsedTimeRotation += this.timeAddRotation;

    if (
      this.elapsedTimeRotation + this.pastRotation.time >=
      this.currentRotation.time
    ) {
      if (this.buffer_rotation.length > 0) {
        this.elapsedTimeRotation = 0;
        this.pastRotation = this.currentRotation;
        this.currentRotation = this.buffer_rotation.dequeue();
        this.timeAddRotation =
          (this.currentRotation.time - this.pastRotation.time) / 2;
      }
    }

    if (this.pastRotation.angle === this.currentRotation.angle) {
      this.fillStartRotation = false;
      this.currentAngle = this.currentRotation.angle;
      this.timeAddRotation = 16;
      return;
    }

    let rotation =
      ((this.currentRotation.angle - this.pastRotation.angle) *
        this.elapsedTimeRotation) /
        (this.currentRotation.time - this.pastRotation.time) +
      this.pastRotation.angle;

    this.currentAngle = rotation;
  }
}
