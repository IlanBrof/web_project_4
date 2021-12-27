export default class UserInfo {
  constructor( {profileName, profileDescription} ) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    const infoAboutUser = { name: this._profileName.textContent, description: this._profileDescription.textContent }
    return infoAboutUser;
  }

  setUserInfo({ menuInputName, menuInputTitle }) {
    this._profileName.textContent = menuInputName;
    this._profileDescription.textContent = menuInputTitle;
  }
}
