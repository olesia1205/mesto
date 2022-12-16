import {popups, popupProfilOpenButtonElement, popupProfilElement, formProfilElement, nameInput, jobInput,
  nameProfil, jobProfil, popupCardOpenButtonElement, popupCardElement, formCardElement,
  cardsSection, cardTitleInput, cardLinkInput, popupImage, popupImageSubtitle, popupImageElement, initialCards, obj} from './constants.js'

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

const handleCardFormSubmit = function(evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
    alt: cardTitleInput.value
  };
  prependCard(data);
  closePopup(popupCardElement);
}

// Открытие попапа редактирования профиля пользователя
popupProfilOpenButtonElement.addEventListener('click', function() {
  nameInput.value = nameProfil.textContent;
  jobInput.value = jobProfil.textContent;
  openPopup(popupProfilElement);
  formValidators['popup-form-profil'].resetValidation();
  // formProfilValidator.resetValidation();
});

formProfilElement.addEventListener('submit', addInfo);

// Открытие попапа карточек
popupCardOpenButtonElement.addEventListener('click', function() {
  openPopup(popupCardElement);
  formCardElement.reset();
  formValidators['popup-form-card'].resetValidation();
  // formCardValidator.resetValidation();
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

// Функция обработчика клика по картинке с открытием попапа, передаем ее в конструктор класса Card
function handleCardClick(name, link) {
  popupImageSubtitle.textContent = this._name;
  popupImage.src = this._link;
  popupImage.alt = this._alt;
  this.openPopup(popupImageElement);
}

// Функция создания карточки из класса Card
function createCard(item) {
  const card = new Card(item, '.place__template', openPopup, handleCardClick);
  const cardElement = card.renderCard(item);
  return cardElement;
}

// Отрисовываем изначальные 6 карточек на странице
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsSection.prepend(cardElement);
})

// Отрисовываем новые карточки при сабмите данных из формы
function prependCard(data) {
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
}

// Создание экземпляров валидаторов всех форм в одном объекте formValidators
const formValidators = {}

// Включение валидации
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(obj, formElement);

    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // записываем в объект под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(obj);

// Добавляем валидацию формы редактирования профиля и формы добавления новых карточек
// const formProfilValidator = new FormValidator(obj, formProfilElement);
// formProfilValidator.enableValidation();

// const formCardValidator = new FormValidator(obj, formCardElement);
// formCardValidator.enableValidation();
