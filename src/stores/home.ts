import { makeAutoObservable } from "mobx";

class HomeStore {
  isActive = false
  videoSrc = ''

  constructor() {
    makeAutoObservable(this);
  }

  setIsActive (value: boolean) {
    this.isActive = value
  }

  getIsActive () {
    return this.isActive
  }

  setVideoSrc (value: string) {
    this.videoSrc = value
  }

  getVideoSrc () {
    return this.videoSrc
  }
}

export default new HomeStore();