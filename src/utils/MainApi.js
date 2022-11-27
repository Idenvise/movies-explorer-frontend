const config = {
  baseUrl: 'https://api.movies.nomoredomains.icu',
  headers: {
    authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
}



export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  register(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "password": password,
        "email": email,
        "name": name
      })
    }).then(res => {return this._checkResponse(res)})
  }

  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(res => {return this._checkResponse(res)})
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const mainApi = new Api(config);