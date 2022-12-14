export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = document.getElementById(`${inputElement.getAttribute('name')}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = document.getElementById(`${inputElement.getAttribute('name')}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  };
}

