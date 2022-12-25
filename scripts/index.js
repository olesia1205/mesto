import {popupProfilOpenButtonElement, popupProfilElement, formProfilElement, nameInput, jobInput,
  nameProfil, jobProfil, popupCardOpenButtonElement, popupCardElement, cardsSection, popupImage,
  popupImageSubtitle, popupImageElement, initialCards, obj} from './constants.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// // Редактирование профиля пользователя
// function addInfo(evt) {
//   evt.preventDefault();
//   nameProfil.textContent = nameInput.value;
//   jobProfil.textContent = jobInput.value;
//   closePopup(popupProfilElement);
// }

// Открытие попапа редактирования профиля пользователя
popupProfilOpenButtonElement.addEventListener('click', function() {
  // nameInput.value = nameProfil.textContent;
  // jobInput.value = jobProfil.textContent;
  userInfo.getUserInfo();
  popupWithProfil.openPopup();
  formValidators['popup-form-profil'].resetValidation();
});

// formProfilElement.addEventListener('submit', addInfo);

// Открытие попапа карточек
popupCardOpenButtonElement.addEventListener('click', function() {
  popupWithCard.openPopup();
  formValidators['popup-form-card'].resetValidation();
});

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

// Создание экземпляра класса PopupWithImage и навешивание слушателей для закрытия по Overlay, Esc и крестику
const popupWithImage = new PopupWithImage(popupImageElement, popupImage, popupImageSubtitle);
popupWithImage.setEventListeners();

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  profilName: nameProfil,
  profilJob: jobProfil
});

// Создание экземпляра класса PopupWithForm для создания новой карточки
const popupWithCard = new PopupWithForm({
  popupSelector: popupCardElement,
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["place-name"],
      link: formValues["place-link"],
      alt: formValues["place-name"]
    };

    prependCard(data);
    popupWithCard.closePopup();
  }
});
popupWithCard.setEventListeners();

// Создание экземпляра класса PopupWithForm для редактирования профиля пользователя
const popupWithProfil = new PopupWithForm({
  popupSelector: popupProfilElement,
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      job: formValues["job"]
    };

    userInfo.setUserInfo(data);
    popupWithProfil.closePopup();
  }
});
popupWithProfil.setEventListeners();
