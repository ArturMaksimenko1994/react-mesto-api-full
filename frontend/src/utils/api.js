export default class Api {
  constructor({address}) {
      this._address = address;
  }

  _handleResponse = (res) => {
      if (res.ok) {
          return res.json()
      }
      return Promise.reject(`Error ${res.status}`)
  }

  getCards(token) {
      return fetch(`${this._address}/cards`, {
          headers: {
              authorization: token
          }
      })
      .then((res) => this._handleResponse(res))
  }

  getUserInfo(token) {
      return fetch(`${this._address}/users/me`, {
          headers: {
              authorization: token
          }
      })
      .then((res) => this._handleResponse(res))
  }

  editProfile(newValue, token) {
      return fetch(`${this._address}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValue.name,
            about: newValue.about
          })
      })
      .then((res) => this._handleResponse(res))
  }

  editAvatar(newValue, token) {
      return fetch(`${this._address}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: newValue
          })
      })
      .then((res) => this._handleResponse(res))
  }

  postCard(newValue, token) {
      return fetch(`${this._address}/cards`, {
          method: 'POST',
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newValue.name,
            link: newValue.link
          })
      })
      .then((res) => this._handleResponse(res))
  }

  putLikeCard(idCard, token) {
      return fetch(`${this._address}/cards/${idCard}/likes`, {
          method: 'PUT',
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
          }
      })
      .then((res) => this._handleResponse(res))
  }

  deleteLikeCard(idCard, token) {
      return fetch(`${this._address}/cards/${idCard}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
          }
      })
      .then((res) => this._handleResponse(res))
  }

  removeCard(idCard, token) {
      return fetch(`${this._address}/cards/${idCard}`, {
          method: 'DELETE',
          headers: {
            authorization: token,
            'Content-Type': 'application/json'
          }
      })
      .then((res) => this._handleResponse(res))
  }
}

// const api = new Api({
//   address: "https://mesto.nomoreparties.co/v1/cohort36",
//   token: "0f2196a7-ac75-4b8c-88fc-6c8538fba14b"
// })
