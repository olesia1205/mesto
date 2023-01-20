export default class Card {
  constructor({item, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector, userInfo) {
    this._name = item.name;
    this._link = item.link;
    this._alt = item.alt;
    this._likes = item.likes;
    this._ownerCardId = item.owner;
    this._cardId = item.cardId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._templateSelector = templateSelector;
    this._userId = userInfo;
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
    this._cardLikeNumber.textContent = this._likes.length;

    // Проверка, есть ли внутри массива likes объект с id === userId
    const likedCards = this._likes.map((el) => {
      return el._id;
    })
    if (likedCards.includes(this._userId._id)) {
      this._cardLikeButton.classList.add('place__like-button_status_active');
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._cardLikeButton);
    });

    if (this._ownerCardId._id === this._userId._id) {
      this._cardDeleteButton.addEventListener('click', () => {
        this._handleDeleteIconClick(this._cardId);
      });
    } else {
      this._cardDeleteButton.remove();
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  removeCard() {
    this._cardElement.closest('.place').remove();
  }

  countLikesNumber(response) {
    this._cardLikeNumber.textContent = response.length;
  }

}
