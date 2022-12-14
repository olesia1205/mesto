import {popupImage, popupImageSubtitle, popupImageElement} from './constants.js'

export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this.openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true).children[0];
    return cardElement;
  }

  renderCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.place__title').textContent = this._name;
    this._cardElement.querySelector('.place__image').src = this._link;
    this._cardElement.querySelector('.place__image').alt = this._alt;

    this._cardElement.querySelector('.place__like-button').addEventListener('click', () => {
      this._cardElement.querySelector('.place__like-button').classList.toggle('place__like-button_status_active');
    });

    this._cardElement.querySelector('.place__delete-button').addEventListener('click', (evt) => {
      evt.target.closest('.place').remove();
    });

    this._cardElement.querySelector('.place__image').addEventListener('click', (data) => {
      popupImage.src = this._link;
      popupImageSubtitle.textContent = this._name;
      popupImage.alt = this._alt;
      this.openPopup(popupImageElement);
    });

    return this._cardElement;
  }

}
