import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._formElement = this._popup.querySelector('.popup__form_type_confirm');
    this._submitButton = this._formElement.querySelector('.popup__button-confirm');
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  openPopup() {
    super.openPopup();
    this._submitButton.focus();
  }

  setCallback(callback) {
    this._handleFormSubmit = callback;
  }
}

