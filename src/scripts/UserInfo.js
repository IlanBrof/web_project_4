export default class UserInfo {
  constructor( {profileName, profileDescription} ) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    const infoAboutUser = { name: this._profileName.textContent, description: this._profileDescription.textContent }
    return infoAboutUser;
  }

  setUserInfo( {name, description} ) {
    this._profileName.textContent = name;
    this._profileName.textContent = description;
  }
}
