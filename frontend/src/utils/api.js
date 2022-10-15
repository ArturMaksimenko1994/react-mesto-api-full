class Api {
  constructor(config) {
      this._address = config.address;
      this._token = config.token;
  }

  _handleResponse = (res) => {
      if (res.ok) {
          return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
  }

  getCards() {
      return fetch(`${this._address}/cards`, {
        method: "GET",
        headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
  }

  getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        method: "GET",
        headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
  }

  editProfile(newValue) {
      return fetch(`${this._address}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: newValue.name,
            about: newValue.about
          })
      })
      .then((res) => this._handleResponse(res))
  }

  editAvatar(newValue) {
      return fetch(`${this._address}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: newValue
          })
      })
      .then((res) => this._handleResponse(res))
  }

  postCard(newValue) {
      return fetch(`${this._address}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: newValue.name,
            link: newValue.link
          })
      })
      .then((res) => this._handleResponse(res))
  }

  putLikeCard(idCard) {
      return fetch(`${this._address}/cards/${idCard}/likes`, {
          method: 'PUT',
          headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
  }

  deleteLikeCard(idCard) {
      return fetch(`${this._address}/cards/${idCard}/likes`, {
          method: 'DELETE',
          headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
  }

  removeCard(idCard) {
      return fetch(`${this._address}/cards/${idCard}`, {
          method: 'DELETE',
          headers: this._headers,
      })
      .then((res) => this._handleResponse(res))
  }
}

const token = localStorage.getItem('token');

const api = new Api({
  url: "https://api.artur.studen.nomoredomains.icu",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
