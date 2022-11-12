// const obj = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_disabled',
//   inputErrorClass: 'popup__input-error',
//   errorClass: 'popup__input-error_active'
// }

// function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
//   const forms = Array.from(document.querySelectorAll(formSelector));
//   forms.forEach(form => {
//     form.addEventListener('submit', evt => evt.preventDefault());

//     //**
//     const inputs = Array.from(form.querySelectorAll(inputSelector));
//     inputs.forEach(input => {
//       input.addEventListener('input', evt => {
//         if (input.validity.valid) {
//           const inputName = input.getAttribute('name');
//           const errorPlace = document.getElementById(`${inputName}-error`);
//           errorPlace.textContent = '';
//           errorPlace.classList.remove(errorClass);
//         } else {
//           const inputName = input.getAttribute('name');
//           const errorPlace = document.getElementById(`${inputName}-error`);
//           errorPlace.textContent = input.validationMessage;
//           errorPlace.classList.add(errorClass);
//         }

//       });
//     });
//   });
// };

// enableValidation(obj);

const showInputError = (formElement, inputElement, errorMessage) => {
  const inputName = inputElement.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const inputName = inputElement.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_disabled');
  } else {
    buttonElement.classList.remove('popup__submit-button_disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();




