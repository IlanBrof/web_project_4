export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: { authorization: this._token }
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: { authorization: this._token }
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }

  async uploadUserCard(name, link) {
    const response = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: { authorization: this._token, 'Content-type': 'application/json' },
      body: JSON.stringify({ name: name, link: link })
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }
}
