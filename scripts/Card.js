import {cardsSection, initialCards, popupImage, popupImageSubtitle, popupImageElement} from './constants.js'
import { openPopup } from './utils.js';

export class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this.openPopup = openPopup;
  }

  _renderCard() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.cloneNode(true).children[0];
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

initialCards.forEach((item) => {
  const card = new Card(item, '.place__template', openPopup);
  const cardElement = card._renderCard(item);
  cardsSection.prepend(cardElement);
})
