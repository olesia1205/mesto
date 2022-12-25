import {popups, popupProfilOpenButtonElement, popupProfilElement, formProfilElement, nameInput, jobInput,
  nameProfil, jobProfil, popupCardOpenButtonElement, popupCardElement, formCardElement,
  cardsSection, cardTitleInput, cardLinkInput, popupImage, popupImageSubtitle, popupImageElement, initialCards, obj} from './constants.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
// import PopupWithForm from './PopupWithForm.js';

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
});

formProfilElement.addEventListener('submit', addInfo);

// Открытие попапа карточек
popupCardOpenButtonElement.addEventListener('click', function() {
  openPopup(popupCardElement);
  formCardElement.reset();
  formValidators['popup-form-card'].resetValidation();
});

formCardElement.addEventListener('submit', handleCardFormSubmit);

// Функция обработчика клика по картинке с открытием попапа, передается в конструктор класса Card
function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

// Функция создания карточки из класса Card
function createCard(item) {
  const card = new Card(item, '.place__template', handleCardClick);
  const cardElement = card.renderCard(item);
  return cardElement;
}

// Отрисовываем новые карточки при сабмите данных из формы
function prependCard(data) {
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
}

// Создание экземпляра класса Section
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createCard(item));
  }
},
cardsSection
);
section.renderItems();

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

// Создание экземпляра класса PopupWithImage и навешивание слушателя для закрытия по Overlay, Esc и крестику
const popupWithImage = new PopupWithImage(popupImageElement, popupImage, popupImageSubtitle);
popupWithImage.setEventListeners();

// // Создание экземпляров класса PopupWithForm
// const popupWithCard = new PopupWithForm({
//   popupSelector: popupCardElement,
//   handleFormSubmit: (formData) => {

//   }
// });
