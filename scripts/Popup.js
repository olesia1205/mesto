export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this.handleEscClose.bind(this);
  }

  // Закрытие попапов по кнопке Escape
  handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      this.closePopup(openedPopup);
    }
  }

  // Открытие и закрытие попапов
  openPopup() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапов по Overlay и иконкам закрытия
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        this.closePopup();
      }
      else if (evt.target.classList.contains('popup__close-button')) {
        this.closePopup()
      }
    })
  }

}



