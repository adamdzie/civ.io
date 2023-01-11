class Player {
  constructor(_x, _y, radius, move_speed, screenCenter) {
    this.position = { x: _x, y: _y };
    this.radius = radius;
    this.move_speed = move_speed;
    this.move_vector = { x: 0, y: 0 };
    this.isMoving = false;
    this.isRotating = false;
    this.mouse_position = { x: 0, y: 0 };
    this.rotation = 0;
    this.lastAngle = this.rotation;
    this.rotationThreshold = 0.1;
    this.screenCenter = { x: screenCenter.x, y: screenCenter.y };
  }

  update(delta) {
    this.updateMovement(delta);
  }

  move() {
    if (this.move_vector.x === 0 && this.move_vector.y === 0) {
      this.isMoving = false;
      return;
    }
    this.position.x += this.move_vector.x * this.move_speed;
    this.position.y += this.move_vector.y * this.move_speed;
  }
  rotate() {
    let a = {
      x: this.mouse_position.x - this.screenCenter.x,
      y: this.mouse_position.y - this.screenCenter.y,
    };
    //console.log(this.mouse);

    let b = { x: 10, y: 0 };

    let angle =
      (a.x * b.x + a.y * b.y) /
      (Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2)) *
        Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2)));

    let good_angle = Math.acos(angle);

    if (this.screenCenter.y > this.mouse_position.y) good_angle *= -1;

    this.rotation = good_angle;
  }

  setIsMoving() {
    if (!(this.move_vector.x === 0 && this.move_vector.y === 0))
      this.isMoving = true;
  }
  setIsRotating() {
    this.isRotating = true;
  }
}

module.exports = Player;
