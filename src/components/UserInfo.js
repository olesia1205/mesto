export default class UserInfo {
  constructor({profilName, profilJob, profilAvatar}) {
    this._profilName = profilName;
    this._profilJob = profilJob;
    this._profilAvatar = profilAvatar;
  }

  getUserInfo() {
    this._profilInfo = {};
    this._profilInfo.name = this._profilName.textContent;
    this._profilInfo.about = this._profilJob.textContent;
    return this._profilInfo;
  }

  setUserInfo(data) {
    this._profilName.textContent = data.name;
    this._profilJob.textContent = data.about;
  }

  setUserInfoFromApi(data) {
    this._profilName.textContent = data.name;
    this._profilJob.textContent = data.about;
    this._profilAvatar.src = data.avatar;
    this._userData = data;
  }

  setUserData() {
    return this._userData;
  }

  changeAvatar(avatar) {
    this._profilAvatar.src = avatar;
  }
}
