export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton.classList.toggle('place__like-button_status_active');
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      evt.target.closest('.place').remove();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

}
