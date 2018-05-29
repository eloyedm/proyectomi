import { Clock } from 'three';

class Score {
  constructor() {
    this.total = 10000;
    this.clock = new Clock();
    this.clock.start();
  }
  view(){
    this.total = this.total <= 0 ? 0 : this.total - this.clock.getElapsedTime() / 50;
    return Math.ceil(this.total);
  }
}

export default Score;
