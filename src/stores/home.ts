import { makeAutoObservable, observable, action, computed } from "mobx";

class HomeStore {
  isActive = false
  // @observable
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

  // @action
  setVideoSrc (value: string) {
    console.log('set videoSrc>>>', value);
    this.videoSrc = value
  }

  // @computed
  getVideoSrc () {
    console.log('get videoSrc>>>', this.videoSrc);
    return this.videoSrc
  }
}

export default new HomeStore();