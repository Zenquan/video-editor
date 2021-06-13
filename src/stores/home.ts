import { makeAutoObservable } from "mobx";

class HomeStore {
  isActive = false

  constructor() {
    makeAutoObservable(this);
  }

  setIsActive (value: boolean) {
    this.isActive = value
  }

  getIsActive () {
    return this.isActive
  }
}

export default new HomeStore();