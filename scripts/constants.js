// Открытие, закрытие попапа редактирования профиля пользователя
export const popups = document.querySelectorAll('.popup');
export const popupProfilOpenButtonElement = document.querySelector('.profile__info-edit-button');
export const popupProfilElement = document.querySelector('.popup_type_profil');
// const popupCloseButtons = document.querySelectorAll('.popup__close-button');

export const formElement = document.querySelector('.popup__form');
export const nameInput = formElement.querySelector('.popup__input_info_name');
export const jobInput = formElement.querySelector('.popup__input_info_job');

export const profilElement = document.querySelector('.profile');
export const nameProfil = profilElement.querySelector('.profile__info-title');
export const jobProfil = profilElement.querySelector('.profile__info-subtitle');

// Открытие, закрытие попапа карточек
export const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
export const popupCardElement = document.querySelector('.popup_type_card');
export const formCardElement  = popupCardElement.querySelector('.popup__form_type_card');
export const popupInputCardElement = formCardElement.querySelector('.popup__input');
export const popupCardSubmitButtonElement = popupCardElement.querySelector('.popup__submit-button');

// Открытие, закрытие попапа с картинками
export const popupImageElement = document.querySelector('.popup_type_image');
export const popupImage = popupImageElement.querySelector('.popup__image');
export const popupImageSubtitle = popupImageElement.querySelector('.popup__image-subtitle');

// Отрисовка карточек с местами при помощи JS, добавление новых карточек - переменные
export const cardsSection = document.querySelector('.places');
export const cardTemplate = cardsSection.querySelector('.place__template').content;
export const cardTitleInput = formCardElement.querySelector('.popup__input_info_place-name');
export const cardLinkInput = formCardElement.querySelector('.popup__input_info_place-link');

export const initialCards = [
  {
    name: 'Хабаровск',
    link: './images/habarovsk.jpg',
    alt: 'Хабаровск'
  },
  {
    name: 'Осетия',
    link: './images/osetia.jpg',
    alt: 'Осетия'
  },
  {
    name: 'Дагестан',
    link: './images/dagestan.jpg',
    alt: 'Дагестан'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg',
    alt: 'Домбай'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg',
    alt: 'Карачаевск'
  }
]
