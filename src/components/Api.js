export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  editUserInfo() {
    fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  addNewCard(){
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: '',
        link: ''
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

}

