import './index.css';

import {popupProfilOpenButtonElement, nameProfil, jobProfil, avatarProfil, popupCardOpenButtonElement,
  cardsSection, popupImage, popupImageSubtitle, obj} from '../utils/constants.js'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Открытие попапа редактирования профиля пользователя
popupProfilOpenButtonElement.addEventListener('click', function() {
  popupWithProfil.setInputValues(userInfo.getUserInfo());
  popupWithProfil.openPopup();
  formValidators['popup-form-profil'].resetValidation();
});

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
const popupWithImage = new PopupWithImage('.popup_type_image', popupImage, popupImageSubtitle);
popupWithImage.setEventListeners();

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  profilName: nameProfil,
  profilJob: jobProfil,
  profilAvatar: avatarProfil
});

// Создание экземпляра класса PopupWithForm для создания новой карточки
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
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
  popupSelector: '.popup_type_profil',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      about: formValues["job"]
    };

    userInfo.setUserInfo(data);
    popupWithProfil.closePopup();
  }
});
popupWithProfil.setEventListeners();

// Инициализация класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57/',
  headers: {
    authorization: 'b68ddc94-1b57-472c-a3a0-fe863a783fd5',
    'Content-Type': 'application/json'
  }
});

// Вызов метода Api для отрисовки информации о пользователе с сервера
api.getUserInfo()
  .then((result) => {
    console.log(result);
    const userInfoFromApi = result;
    userInfo.setUserInfo(userInfoFromApi);
  })
  .catch((err) => {
    console.log(err);
  })

// Вызов метода Api для отрисовки карточек, полученных с сервера
api.getInitialCards()
  .then((result) => {
    const initialCards = result;

    const section = new Section({
      items: initialCards,
      renderer: (item) => {
        section.addItem(createCard(item));
      }
    },
    cardsSection
    );
    section.renderItems();

  })
  .catch((err) => {
    console.log(err);
  })



  // Создание экземпляра класса Section
// const section = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     section.addItem(createCard(item));
//   }
// },
// cardsSection
// );
// section.renderItems();


