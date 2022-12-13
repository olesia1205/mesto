import {popups, popupProfilOpenButtonElement, popupProfilElement, formElement, nameInput, jobInput,
  nameProfil, jobProfil, popupCardOpenButtonElement, popupCardElement, formCardElement,
  popupCardSubmitButtonElement, cardsSection, cardTitleInput, cardLinkInput, initialCards, obj} from './constants.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js'

// Открытие и закрытие попапов
const openPopup = function(popupProfilElement) {
  popupProfilElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEscape);
}

const closePopup = function(popupProfilElement) {
  popupProfilElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// Редактирование профиля пользователя
function addInfo(evt) {
  evt.preventDefault();
  nameProfil.textContent = nameInput.value;
  jobProfil.textContent = jobInput.value;
  closePopup(popupProfilElement);
}

// // Отрисовка карточек с местами при помощи JS, добавление новых карточек
// const renderCard = function(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardElementImage = cardElement.querySelector('.place__image');
//   const cardElementImageText = cardElement.querySelector('.place__title');
//   cardElementImageText.textContent = data.name;
//   cardElementImage.src = data.link;
//   cardElementImage.alt = data.alt;

//   cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
//     evt.target.classList.toggle('place__like-button_status_active');
//   });

//   cardElement.querySelector('.place__delete-button').addEventListener('click', function(evt) {
//     evt.target.closest('.place').remove();
//   });

//   cardElementImage.addEventListener('click', function(data) {
//     popupImage.src = cardElementImage.src;
//     popupImageSubtitle.textContent = cardElementImageText.textContent;
//     popupImage.alt = cardElementImageText.textContent;
//     openPopup(popupImageElement);
//   });

//   return cardElement;
// }

// const createCard = function(data) {
//   const cardElement = renderCard(data);
//   cardsSection.prepend(cardElement);
// }

// initialCards.forEach(createCard);

const handleCardFormSubmit = function(evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
    alt: cardTitleInput.value
  };
  createCard(data);
  closePopup(popupCardElement);
}

// Открытие попапа редактирования профиля пользователя
popupProfilOpenButtonElement.addEventListener('click', function() {
  nameInput.value = nameProfil.textContent;
  jobInput.value = jobProfil.textContent;
  openPopup(popupProfilElement);
});

formElement.addEventListener('submit', addInfo);

// function setSubmitButtonState(popupCardSubmitButtonElement) {
//   popupCardSubmitButtonElement.setAttribute("disabled", true);
//   popupCardSubmitButtonElement.classList.add('popup__submit-button_disabled');
// };

// Открытие попапа карточек
popupCardOpenButtonElement.addEventListener('click', function() {
  openPopup(popupCardElement);
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  // setSubmitButtonState(popupCardSubmitButtonElement);
});

formCardElement.addEventListener('submit', handleCardFormSubmit);

// Закрытие попапов по Overlay и кнопкам закрытия, крестикам
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
});

// Функция закрытия попапов по кнопке Escape
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.place__template', openPopup);
  const cardElement = card.renderCard(item);
  cardsSection.prepend(cardElement);
})

const createCard = (data) => {
  const card = new Card(data, '.place__template', openPopup);
  const cardElement = card.renderCard(data);
  cardsSection.prepend(card.renderCard());
}

// const formValidator = new FormValidator(obj, );
