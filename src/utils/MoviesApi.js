const config = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
}

export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
  }

  getMovies() {
    return fetch (this.url, {
      method: 'GET'
    }).then(res => {return this._checkResponse(res)})
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

}

export const moviesApi = new Api(config);