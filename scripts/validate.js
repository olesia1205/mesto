const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());

    //**
    const inputs = form.querySelectorAll(inputSelector);
    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        if (input.validity.valid) {
          const inputName = input.getAttribute('name');
          const errorPlace = document.getElementById(`${inputName}-error`);
          errorPlace.textContent = '';
          errorPlace.classList.remove(errorClass);
        } else {
          const inputName = input.getAttribute('name');
          const errorPlace = document.getElementById(`${inputName}-error`);
          errorPlace.textContent = input.validationMessage;
          errorPlace.classList.add(errorClass);
        }

      });
    });
  });
};

enableValidation(obj);
