// Открытие и закрытие модального окна
const popupOpenButtonElement = document.querySelector('.profile__info-edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const openPopup = function(event) {
  popupElement.classList.add('popup_is-opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

//Редактирование имени и информации о себе

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__info');
const popupSubmitButton = formElement.querySelector('.popup__submit-button');

const profilElement = document.querySelector('.profile');
let nameProfil = profilElement.querySelector('.profile__info-title');
let jobProfil = profilElement.querySelector('.profile__info-subtitle');

function addName(evt) {
  evt.preventDefault();
  if (nameInput.value !== '') {
    nameProfil.textContent = nameInput.value;
  } else {
    closePopup();
  }
}

function addJob(evt) {
  evt.preventDefault();
  if (jobInput.value !== '') {
    jobProfil.textContent = jobInput.value;
  } else {
    closePopup();
  }
}

formElement.addEventListener('submit', addName);
formElement.addEventListener('submit', addJob);
popupSubmitButton.addEventListener('click', closePopup);

