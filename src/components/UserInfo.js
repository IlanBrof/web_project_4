export default class UserInfo {
  constructor({ profileName, profileDescription, avatarImage }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._avatarImage = avatarImage;
  }

  getUserInfo() {
    const infoAboutUser = { name: this._profileName.textContent, description: this._profileDescription.textContent, avatar: this._avatarImage, id: this._profileId }
    return infoAboutUser;
  }

  setUserInfo({ name, description, avatar, id }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
    this._avatarImage.src = avatar;
    this._profileId = id;
  }
}
