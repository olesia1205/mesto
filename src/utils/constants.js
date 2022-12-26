import habarovsk from '../images/habarovsk.jpg';
import osetia from '../images/osetia.jpg';
import dagestan from '../images/dagestan.jpg';
import kholmogorsk from '../images/kholmogorsky-rayon.jpg';
import ivanovo from '../images/ivanovo.jpg';
import karachaevsk from '../images/karachaevsk.jpg';

// Открытие, закрытие попапа редактирования профиля пользователяnt
export const popups = document.querySelectorAll('.popup');
export const popupProfilOpenButtonElement = document.querySelector('.profile__info-edit-button');
export const popupProfilElement = document.querySelector('.popup_type_profil');

export const formProfilElement = document.forms["popup-form-profil"];
export const nameInput = formProfilElement.querySelector('.popup__input_info_name');
export const jobInput = formProfilElement.querySelector('.popup__input_info_job');

export const profilElement = document.querySelector('.profile');
export const nameProfil = profilElement.querySelector('.profile__info-title');
export const jobProfil = profilElement.querySelector('.profile__info-subtitle');

// Открытие, закрытие попапа карточек
export const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
export const popupCardElement = document.querySelector('.popup_type_card');
export const formCardElement = document.forms["popup-form-card"];
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
    link: habarovsk,
    alt: 'Хабаровск'
  },
  {
    name: 'Осетия',
    link: osetia,
    alt: 'Осетия'
  },
  {
    name: 'Дагестан',
    link: dagestan,
    alt: 'Дагестан'
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsk,
    alt: 'Домбай'
  },
  {
    name: 'Иваново',
    link: ivanovo,
    alt: 'Иваново'
  },
  {
    name: 'Карачаевск',
    link: karachaevsk,
    alt: 'Карачаевск'
  }
]

export const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}
