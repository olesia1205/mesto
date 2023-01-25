// Открытие, закрытие попапа редактирования профиля пользователя
export const popupProfilOpenButtonElement = document.querySelector('.profile__info-edit-button');

export const profileElement = document.querySelector('.profile');
export const nameProfile = profileElement.querySelector('.profile__info-title');
export const jobProfile = profileElement.querySelector('.profile__info-subtitle');
export const avatarProfile = document.querySelector('.profile__avatar');
export const avatarCover = document.querySelector('.profile__avatar-cover');

// Открытие, закрытие попапа карточек
export const popupCardOpenButtonElement = document.querySelector('.profile__add-button');

// Открытие, закрытие попапа с картинками
export const popupImageElement = document.querySelector('.popup_type_image');
export const popupImage = popupImageElement.querySelector('.popup__image');
export const popupImageSubtitle = popupImageElement.querySelector('.popup__image-subtitle');

// Отрисовка карточек с местами при помощи JS, добавление новых карточек - переменные
export const cardsSection = document.querySelector('.places');
export const cardTemplate = cardsSection.querySelector('.place__template').content;

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}
