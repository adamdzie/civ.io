function Timer(callback, timeInterval) {
  this.timeInterval = timeInterval;

  this.start = () => {
    this.expected = Date.now() + this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval);
  };

  this.stop = () => {
    clearTimeout(this.timeout);
  };

  this.round = () => {
    let drift = Date.now() - this.expected;
    callback();
    this.expected += this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}

module.exports = Timer;
