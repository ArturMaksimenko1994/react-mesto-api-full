export const BASE_URL = 'https://api.artur.studen.nomoredomains.icu'

const handleResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Error ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${this._address}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
};

export const authorize = (password, email) => {
  return fetch(`${this._address}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token)
      return data
    }
  })
};

export const getInfo = () => {
  console.log(`информаия пользователя ${localStorage.setItem('token')}`)
  return fetch(`${this._address}/users/me`, {
    method: 'GET',
    headers: this._header,
  })
  .then(handleResponse)
  .then(data => data)
}