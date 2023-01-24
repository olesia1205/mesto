export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this.handleEscClose.bind(this);
  }

  // Закрытие попапов по кнопке Escape
  handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  // Открытие и закрытие попапов
  openPopup() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапов по Overlay и иконкам закрытия
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    })
  }
}



