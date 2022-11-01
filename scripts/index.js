// Открытие, закрытие попапа редактирования профиля пользователя
const popupProfilOpenButtonElement = document.querySelector('.profile__info-edit-button');
const popupProfilElement = document.querySelector('.popup_type_profil');
const popupProfilCloseButtonElement = popupProfilElement.querySelector('.popup__close-button');

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

// Открытие, закрытие попапа с картинками
const popupImageElement = document.querySelector('.popup_type_image');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupImageSubtitle = popupImageElement.querySelector('.popup__image-subtitle');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close-button');

// Отрисовка карточек с местами при помощи JS, добавление новых карточек - переменные
const cardsSection = document.querySelector('.places');
const cardTemplate = cardsSection.querySelector('.place__template').content;
const cardTitleInput = formCardElement.querySelector('.popup__input_info_place-name');
const cardLinkInput = formCardElement.querySelector('.popup__input_info_place-link');

const initialCards = [
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

// Открытие, закрытие попапов
const openPopup = function(popupProfilElement) {
  popupProfilElement.classList.add('popup_is-opened');
}

const closePopup = function(popupProfilElement) {
  popupProfilElement.classList.remove('popup_is-opened');
}

// Редактирование профиля пользователя
function addInfo(evt) {
  evt.preventDefault();
  nameProfil.textContent = nameInput.value;
  jobProfil.textContent = jobInput.value;
  closePopup(popupProfilElement);
}

// Отрисовка карточек с местами при помощи JS, добавление новых карточек
const renderCard = function(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.place__image');
  const cardElementImageText = cardElement.querySelector('.place__title');
  cardElementImageText.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.alt;

  cardElement.querySelector('.place__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('place__like-button_status_active');
  });

  cardElement.querySelector('.place__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.place').remove();
  });

  cardElementImage.addEventListener('click', function(data) {
    popupImage.src = cardElementImage.src;
    popupImageSubtitle.textContent = cardElementImageText.textContent;
    popupImage.alt = cardElementImageText.textContent;
    openPopup(popupImageElement);
  });

  return cardElement;
}

const createCard = function(data) {
  const cardElement = renderCard(data);
  cardsSection.prepend(cardElement);
}

initialCards.forEach(createCard);

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

// Открытие, закрытие попапа редактирования профиля пользователя
popupProfilOpenButtonElement.addEventListener('click', function() {
  nameInput.value = nameProfil.textContent;
  jobInput.value = jobProfil.textContent;
  openPopup(popupProfilElement);
});

popupProfilCloseButtonElement.addEventListener('click', function() {
  closePopup(popupProfilElement);
});

formElement.addEventListener('submit', addInfo);

// Открытие, закрытие попапа карточек
popupCardOpenButtonElement.addEventListener('click', function() {
  openPopup(popupCardElement);
  cardTitleInput.value = '';
  cardLinkInput.value = '';
});

popupCardCloseButtonElement.addEventListener('click', function() {
  closePopup(popupCardElement);
});

formCardElement.addEventListener('submit', handleCardFormSubmit);

//Закрытие попапа картинок
popupImageCloseButtonElement.addEventListener('click', function() {
  closePopup(popupImageElement);
});

// Закрытие попапов по Overlay

// const closePopupByClickOnOverlay = function(event) {
//   if (event.target !== event.currentTarget) {
//     return;
//   }
//   closePopup();
// }

// popupProfilElement.addEventListener('click', closePopupByClickOnOverlay);


