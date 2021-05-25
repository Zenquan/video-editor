import { makeAutoObservable } from "mobx";

class Timer {
  secondsPassed = 0

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  decrease() {
    this.secondsPassed -= 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

export default new Timer();