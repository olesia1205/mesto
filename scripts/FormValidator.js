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
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
  }

  _showInputError = (formElement, inputElement, errorMessage, {errorClass, ...rest}) => {
    const inputName = inputElement.getAttribute('name');
    const errorElement = this._formElement.getElementById(`${inputName}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement, {errorClass, ...rest}) => {
    const inputName = inputElement.getAttribute('name');
    const errorElement = this._formElement.getElementById(`${inputName}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _hasInvalidInput = (inputList) => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  _checkInputValidity = (formElement, inputElement, rest) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
      this._hideInputError(formElement, inputElement, rest);
    }
  };

  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(formElement, inputElement, rest);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  enableValidation = ({formSelector, ...rest}) => {
    this._formList.forEach((formElement) => {
      this._formElement.addEventListener('submit', evt => evt.preventDefault());
      this._setEventListeners(formElement, rest);
    });
  };
}

// enableValidation(obj);

