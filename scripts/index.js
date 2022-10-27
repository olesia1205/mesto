// Открытие, закрытие попапа редактирования профиля пользователя - переменные
const popupOpenButtonElement = document.querySelector('.profile__info-edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_info_name');
const jobInput = formElement.querySelector('.popup__input_info_job');

const profilElement = document.querySelector('.profile');
const nameProfil = profilElement.querySelector('.profile__info-title');
const jobProfil = profilElement.querySelector('.profile__info-subtitle');

// Открытие, закрытие попапа редактирования карточек - переменные
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
const popupCardElement = document.querySelector('.popup_type_card');
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close-button');
const cardsSection = document.querySelector('.places');

const initialCards = [
  {
    name: 'Хабаровск',
    link: '../images/habarovsk.jpg'
  },
  {
    name: 'Осетия',
    link: '../images/osetia.jpg'
  },
  {
    name: 'Дагестан',
    link: '../images/dagestan.jpg'

  },
  {
    name: 'Домбай',
    link: '../images/dombay.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/elbrus.jpg'
  },
  {
    name: 'Карачаевск',
    link: '../images/karachaevsk.jpg'
  }
]


// Открытие, закрытие попапа редактирования профиля пользователя - функции
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

// Добавление карточек с местами
const addCard = function() {
  const cardTemplate = document.querySelector('.place__template').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  initialCards.forEach(function (card) {
    cardElement.querySelector('.place__title').textContent = card.name;
    cardElement.querySelector('.place__image').src = card.link;
  });

  cardsSection.prepend(cardTemplate);
}
addCard();

// Открытие, закрытие попапа редактирования карточек - функции
const openPopupCard = function() {
  popupCardElement.classList.add('popup_is-opened');
}

const closePopupCard = function() {
  popupCardElement.classList.remove('popup_is-opened');
}

// Открытие, закрытие попапа редактирования профиля пользователя - слушатели событий
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
