import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._handleFormSubmit = handleFormSubmit;

    this._formElement = this._popup.querySelector('.popup__form_type_confirm');
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setFunctionSubmit(task) {
    this._handleFormSubmit = task;
  }

}
