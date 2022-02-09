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
    if (response) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }

  async editUserInfo(name, about) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { authorization: this._token, 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: name,
        about: about
      })
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

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._token },
    })
    if (response.ok) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }

  async like(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: { authorization: this._token, 'Content-type': 'application/json' },
    })
    if (response) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }

  async dislike(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._token, 'Content-type': 'application/json' },
    })
    if (response) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }

  async setUserAvatar(link) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: { authorization: this._token, 'Content-type': 'application/json' },
      body: JSON.stringify({ avatar: link })
    });
    if (response.ok) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
    }
  }
}
