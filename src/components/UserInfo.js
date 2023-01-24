export default class UserInfo {
  constructor({profileName, profileJob, profileAvatar}) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo.name = this._profileName.textContent;
    this._profileInfo.about = this._profileJob.textContent;
    this._profileInfo.avatar = this._profileAvatar.src;
    return this._profileInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
    this._profileAvatar.src = data.avatar;
    this._userData = data;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }

  getUserId() {
    return this._userId = this._userData._id;
  }

}
