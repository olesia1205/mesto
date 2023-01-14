export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteIconClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt || data.name;
    this._likes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true).children[0];
    return cardElement;
  }

  renderCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.place__image');
    this._cardTitle = this._cardElement.querySelector('.place__title');
    this._cardLikeButton = this._cardElement.querySelector('.place__like-button');
    this._cardDeleteButton = this._cardElement.querySelector('.place__delete-button');
    this._cardLikeNumber = this._cardElement.querySelector('.place__like-number');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardLikeNumber.textContent = this._likes;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton.classList.toggle('place__like-button_status_active');
    });

    this._cardDeleteButton.addEventListener('click', () => {
      // evt.target.closest('.place').remove();
      this._handleDeleteIconClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

}
