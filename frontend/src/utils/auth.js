export const BASE_URL = 'https://auth.nomoreparties.co'

const handleResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Error ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
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
  return fetch(`${BASE_URL}/signin`, {
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

export const getInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(handleResponse)
  .then(data => data)
}