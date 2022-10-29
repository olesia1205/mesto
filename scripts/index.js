// Открытие, закрытие попапа редактирования профиля пользователя
const popupOpenButtonElement = document.querySelector('.profile__info-edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_info_name');
const jobInput = formElement.querySelector('.popup__input_info_job');

const profilElement = document.querySelector('.profile');
const nameProfil = profilElement.querySelector('.profile__info-title');
const jobProfil = profilElement.querySelector('.profile__info-subtitle');

// Открытие, закрытие попапа карточек
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
const popupCardElement = document.querySelector('.popup_type_card');
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close-button');
const formCardElement  = popupCardElement.querySelector('.popup__form_type_card');

// Открытие попапа с картинками
const popupImageElement = document.querySelector('.popup_type_image');

// Отрисовка карточек с местами при помощи JS, добавление новых карточек - переменные
const cardsSection = document.querySelector('.places');
const cardTemplate = cardsSection.querySelector('.place__template').content;
const cardTitleInput = formCardElement.querySelector('.popup__input_info_place-name');
const cardLinkInput = formCardElement.querySelector('.popup__input_info_place-link');

const initialCards = [
  {
    name: 'Хабаровск',
    link: '../images/habarovsk.jpg',
    alt: 'Хабаровск'
  },
  {
    name: 'Осетия',
    link: '../images/osetia.jpg',
    alt: 'Осетия'
  },
  {
    name: 'Дагестан',
    link: '../images/dagestan.jpg',
    alt: 'Дагестан'
  },
  {
    name: 'Домбай',
    link: '../images/dombay.jpg',
    alt: 'Домбай'
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/elbrus.jpg',
    alt: 'Эльбрус'
  },
  {
    name: 'Карачаевск',
    link: '../images/karachaevsk.jpg',
    alt: 'Карачаевск'
  }
]

// Открытие, закрытие попапа редактирования профиля пользователя - функции
const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = nameProfil.textContent;
  jobInput.value = jobProfil.textContent;
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

function addInfo(evt) {
  evt.preventDefault();
  nameProfil.textContent = nameInput.value;
  jobProfil.textContent = jobInput.value;
  closePopup(popupElement);
}

// Отрисовка карточек с местами при помощи JS, добавление новых карточек
const renderCard = function(data) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__title').textContent = data.name;
  cardElement.querySelector('.place__image').src = data.link;
  cardElement.querySelector('.place__image').alt = data.alt;

  cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('place__like-button_status_active');
  });

  cardElement.querySelector('.place__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.place').remove();
  });

  cardElement.querySelector('.place__image').addEventListener('click', function(evt) {
    popupImageElement.src =
    popupImageElement.alt =
    evt.target.classList.toggle('popup_is-opened');
  });


  cardsSection.prepend(cardElement);
}

initialCards.forEach(renderCard);

const createCard = function() {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__title').textContent = cardTitleInput.value;
  cardElement.querySelector('.place__image').src = cardLinkInput.value;
  cardElement.querySelector('.place__image').alt = cardTitleInput.value;

  cardElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_status_active');
  });

  cardElement.querySelector('.place__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.place').remove();
  });

  cardsSection.prepend(cardElement);
}

const CardSubmitHandler = function(evt) {
  evt.preventDefault();
  createCard();
  closePopup(popupCardElement);
}

// Открытие, закрытие попапа карточек - функции
function openPopupCard() {
  popupCardElement.classList.add('popup_is-opened');
  cardTitleInput.value = '';
  cardLinkInput.value = '';
}

// Открытие, закрытие попапа редактирования профиля пользователя
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', function() {
  closePopup(popupElement);
});
formElement.addEventListener('submit', addInfo);

// Отрисовка карточек с местами при помощи JS, добавление новых карточек
popupCardOpenButtonElement.addEventListener('click', openPopupCard);
popupCardCloseButtonElement.addEventListener('click', function() {
  closePopup(popupCardElement);
});
formCardElement.addEventListener('submit', CardSubmitHandler);


// const closePopupByClickOnOverlay = function(event) {
//   if (event.target !== event.currentTarget) {
//     return;
//   }
//   closePopup();
// }

// popupElement.addEventListener('click', closePopupByClickOnOverlay);
