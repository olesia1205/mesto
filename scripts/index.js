// Открытие, закрытие попапа редактирования профиля пользователя - переменные //
const popupOpenButtonElement = document.querySelector('.profile__info-edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_info_name');
const jobInput = formElement.querySelector('.popup__input_info_job');

const profilElement = document.querySelector('.profile');
const nameProfil = profilElement.querySelector('.profile__info-title');
const jobProfil = profilElement.querySelector('.profile__info-subtitle');

// Открытие, закрытие попапа редактирования карточек - переменные //
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
const popupCardElement = document.querySelector('.popup_type_card');
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close-button');


// Открытие, закрытие попапа редактирования профиля пользователя - функции //
const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = nameProfil.textContent;
  jobInput.value = jobProfil.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
}

function addInfo(evt) {
  evt.preventDefault();
  nameProfil.textContent = nameInput.value;
  jobProfil.textContent = jobInput.value;
  closePopup();
}

// Открытие, закрытие попапа редактирования карточек - функции//
const openPopupCard = function() {
  popupCardElement.classList.add('popup_is-opened');
}

const closePopupCard = function() {
  popupCardElement.classList.remove('popup_is-opened');
}

// Открытие, закрытие попапа редактирования профиля пользователя - слушатели событий //
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', addInfo);

popupCardOpenButtonElement.addEventListener('click', openPopupCard);
popupCardCloseButtonElement.addEventListener('click', closePopupCard);
// const closePopupByClickOnOverlay = function(event) {
//   if (event.target !== event.currentTarget) {
//     return;
//   }
//   closePopup();
// }

// popupElement.addEventListener('click', closePopupByClickOnOverlay);
