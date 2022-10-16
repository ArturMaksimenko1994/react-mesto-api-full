class Api {
  constructor({address, token}) {
      this._address = address;
      this._token = token;
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
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
      })
      .then((res) => this._handleResponse(res))
  }

  getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
      }
      })
      .then((res) => this._handleResponse(res))
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return api.deleteLikeCard(id);
    } else {
      return api.putLikeCard(id);
    }
  }

  editProfile(newValue) {
      return fetch(`${this._address}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
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
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            avatar: newValue
          })
      })
      .then((res) => this._handleResponse(res))
  }

  postCard(newValue) {
      return fetch(`${this._address}/cards`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
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
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
      })
      .then((res) => this._handleResponse(res))
  }

  deleteLikeCard(idCard) {
      return fetch(`${this._address}/cards/${idCard}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
      })
      .then((res) => this._handleResponse(res))
  }

  removeCard(idCard) {
      return fetch(`${this._address}/cards/${idCard}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
      })
      .then((res) => this._handleResponse(res))
  }
}

const api = new Api({
  address: "https://api.artur.studen.nomoredomains.icu"
})

export default api;
