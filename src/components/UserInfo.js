export default class UserInfo {
  constructor({profilName, profilJob}) {
    this._profilName = profilName;
    this._profilJob = profilJob;
  }

  getUserInfo() {
    this._profilInfo = {};
    this._profilInfo.name = this._profilName.textContent;
    this._profilInfo.job = this._profilJob.textContent;
    return this._profilInfo;
  }

  setUserInfo(data) {
    this._profilName.textContent = data.name;
    this._profilJob.textContent = data.job;
  }
}
