export default class UserInfo {
  constructor({ profileName, profileDescription }) {
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

  async addCard(name, link) {
    const response = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: { authorization: this._token, 'Content-type': 'application/json' },
      body: { name: name, link: link }
    })
    if (response.ok) {
      return { name, link };
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }
}
