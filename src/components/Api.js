export default class Api {
  constructor(options) {
    // тело конструктора
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-57/users/me', {
      method: 'GET',
      headers: {
        authorization: 'b68ddc94-1b57-472c-a3a0-fe863a783fd5'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-57/cards', {
      method: 'GET',
      headers: {
        authorization: 'b68ddc94-1b57-472c-a3a0-fe863a783fd5'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  editUserInfo() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-57/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'b68ddc94-1b57-472c-a3a0-fe863a783fd5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    })
  }

}

