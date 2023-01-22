export default class Card {
  constructor({cardData, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector, userInfo) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.alt;
    this._likes = cardData.likes;
    this._ownerCardId = cardData.owner;
    this._cardId = cardData.cardId;

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

  generateCard() {
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

    // Проверка, есть ли внутри массива likes - объект с id === userId
    if (this.isLiked()) {
      this._cardLikeButton.classList.add('place__like-button_status_active');
    } else {
      this._cardLikeButton.classList.add('place__like-button');
    }

    this._setEventListeners();

    return this._cardElement;
  }

  isLiked() {
    this._likes.some(card => card._id === this._userId._id);
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

  updateLikes(response) {
    this._cardLikeNumber.textContent = response.length;
  }
}
