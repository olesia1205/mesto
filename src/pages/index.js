import './index.css';

import {popupProfilOpenButtonElement, nameProfil, jobProfil, avatarProfil, avatarCover, popupCardOpenButtonElement,
  cardsSection, popupImage, popupImageSubtitle, obj} from '../utils/constants.js'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithAvatar from '../components/PopupWithAvatar';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


// Создание экземпляра класса PopupWithImage и навешивание слушателей для закрытия по Overlay, Esc и крестику
const popupWithImage = new PopupWithImage('.popup_type_image', popupImage, popupImageSubtitle);
popupWithImage.setEventListeners();

// Создание экземпляра класса PopupWithSubmit для подтверждения удаления карточки
const popupWithSubmit = new PopupWithSubmit('.popup_type_confirm');
popupWithSubmit.setEventListeners();

// Инициализация класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57/',
  headers: {
    authorization: 'b68ddc94-1b57-472c-a3a0-fe863a783fd5',
    'Content-Type': 'application/json'
  }
});

api.getAllNeededData()
  .then((result) => {
    const [dataForUserInfo, dataForInitialCards] = result;
    console.log(result);

    userInfo.setUserInfoFromApi(dataForUserInfo);

    const initialCards = dataForInitialCards;
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
  .catch(err => alert(err));

// Создание экземпляра класса Card
function createCard(item) {
  const card = new Card({
    item: {
      name: item.name,
      link: item.link,
      alt: item.alt || item.name,
      cardId: item._id,
      likes: item.likes,
      owner: item.owner
    },

    handleCardClick: (name, link) => {
      popupWithImage.openPopup(name, link);
    },

    handleLikeClick: (cardId) => {

    },

    handleDeleteIconClick: (cardId) => {
      popupWithSubmit.openPopup();
      popupWithSubmit.addTask(() => {
        api.deleteCard(cardId)
        .then(response => {
          console.log(response);
          popupWithSubmit.closePopup();
          card.removeCard();
        })
        .catch(err => console.log(err))
    });

    }
  },
  '.place__template',
  userInfo.setUserData());

  const cardElement = card.renderCard(item);
  return cardElement;
}

// Создание экземпляра класса PopupWithForm для редактирования профиля пользователя
const popupWithProfil = new PopupWithForm({
  popupSelector: '.popup_type_profil',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      about: formValues["about"]
    };

    api.patchUserInfo(data);
    userInfo.setUserInfo(data);
    popupWithProfil.closePopup();
  }
});
popupWithProfil.setEventListeners();

// Создание экземпляра класса PopupWithForm для создания новой карточки
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["place-name"],
      link: formValues["place-link"],
      alt: formValues["place-name"]
    };

    api.postNewCard(data)
      .then((response) => {
        prependCard(response);
        popupWithCard.closePopup();
      })
      .catch((err) => console.log(err));
  }
});
popupWithCard.setEventListeners();

// Отрисовка новых карточек при сабмите данных из формы в начале секции
function prependCard(data) {
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
}

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  profilName: nameProfil,
  profilJob: jobProfil,
  profilAvatar: avatarProfil
});

// Создание экземпляра класса PopupWithAvatar
const popupWithAvatar = new PopupWithAvatar({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formValues) => {
    const avatar = formValues["avatar-link"];
    api.changeAvatar(avatar)
      .then((response) => {
        console.log(response);
        popupWithAvatar.closePopup();
        userInfo.changeAvatar(avatar);
      })
      .catch((err) => console.log(err));
  }
});
popupWithAvatar.setEventListeners();

// Открытие попапа редактирования аватара пользователя
avatarCover.addEventListener('click', function() {
  popupWithAvatar.openPopup();
  formValidators['popup-form-avatar'].resetValidation();
});

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
