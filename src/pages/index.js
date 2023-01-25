import './index.css';

import {popupProfilOpenButtonElement, nameProfile, jobProfile, avatarProfile, avatarCover, popupCardOpenButtonElement,
  cardsSection, popupImage, popupImageSubtitle, validationConfig} from '../utils/constants.js'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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
    // console.log(result);

    userInfo.setUserInfo(dataForUserInfo);

    const initialCards = dataForInitialCards;

    const section = new Section(
      {
        cardsData: initialCards,
        renderer: (cardData) => {
          section.addCard(createCard(cardData));
        },
      },
      cardsSection
    );
    section.renderCards();

    // Создание экземпляра класса PopupWithForm для создания новой карточки
    const popupWithCard = new PopupWithForm({
      popupSelector: '.popup_type_card',
      handleFormSubmit: (formValues) => {
        const data = {
          name: formValues["place-name"],
          link: formValues["place-link"],
          alt: formValues["place-name"]
        };

        popupWithCard.setSubmitButtonText("Сохранение...");
        api.postNewCard(data)
          .then((response) => {
            prependCard(response);
            popupWithCard.closePopup();
          })
          .catch(err => console.log(err))
          .finally(() => {
            popupWithCard.setSubmitButtonText("Создать");
          });
      }
    });
    popupWithCard.setEventListeners();

    // Отрисовка новых карточек при сабмите данных из формы в начале секции
    function prependCard(data) {
      const cardElement = createCard(data);
      section.prependCard(cardElement);
    }

    // Открытие попапа редактирования аватара пользователя
    avatarCover.addEventListener('click', function() {
      popupWithAvatar.openPopup();
      formValidators['popup-form-avatar'].resetValidation();
    });

    // Открытие попапа редактирования профиля пользователя
    popupProfilOpenButtonElement.addEventListener('click', function() {
      popupWithProfil.setInputValues(userInfo.getUserInfo());
      popupWithProfil.openPopup();
    });

    // Открытие попапа карточек
    popupCardOpenButtonElement.addEventListener('click', function() {
      popupWithCard.openPopup();
      formValidators['popup-form-card'].resetValidation();
    });

    // Создание экземпляров валидаторов всех форм в одном объекте formValidators
    const formValidators = {}

    // Включение валидации
    const enableValidation = (validationConfig) => {
      const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
      formList.forEach((formElement) => {
        const validator = new FormValidator(validationConfig, formElement);

        // получаем данные из атрибута `name` у формы
        const formName = formElement.name;
        // записываем в объект под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
      });
    };

    enableValidation(validationConfig);
  })
  .catch(err => alert(err))

// Создание экземпляра класса Card
function createCard(cardData) {
  const card = new Card({
    cardData: {
      name: cardData.name,
      link: cardData.link,
      alt: cardData.alt || cardData.name,
      cardId: cardData._id,
      likes: cardData.likes,
      owner: cardData.owner
    },

    handleCardClick: (name, link) => {
      popupWithImage.openPopup(name, link);
    },

    handleLikeClick: (cardId) => {
      if(card.isLiked()) {
        api.deleteLike(cardId)
          .then((response) => {
            card.updateLikesCount(response);
            card.setLikesView(response.likes);
          })
          .catch(err => console.log(err))
      } else {
        api.putLike(cardId)
          .then((response) => {
            card.updateLikesCount(response);
            card.setLikesView(response.likes);
          })
          .catch(err => console.log(err))
      }
    },

    handleDeleteIconClick: (cardId) => {
      popupWithSubmit.openPopup();
      popupWithSubmit.setCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            popupWithSubmit.closePopup();
            card.removeCard();
          })
          .catch(err => console.log(err))
      });
    }
  },
  '.place__template',
  userInfo.getUserId());

  const cardElement = card.generateCard();
  return cardElement;
}

// Создание экземпляра класса PopupWithForm для редактирования профиля пользователя
const popupWithProfil = new PopupWithForm({
  popupSelector: '.popup_type_profil',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      about: formValues["about"],
      avatar: avatarProfile.src
    };

    popupWithProfil.setSubmitButtonText("Сохранение...");
    api.patchUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupWithProfil.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithProfil.setSubmitButtonText("Сохранить");
      });
  }
});
popupWithProfil.setEventListeners();

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  profileName: nameProfile,
  profileJob: jobProfile,
  profileAvatar: avatarProfile
});

// Создание экземпляра класса PopupWithAvatar
const popupWithAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formValues) => {
    const avatar = formValues["avatar-link"];

    popupWithAvatar.setSubmitButtonText("Сохранение...");
    api.changeAvatar(avatar)
      .then(() => {
        popupWithAvatar.closePopup();
        userInfo.setUserAvatar(avatar);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithAvatar.setSubmitButtonText("Сохранить");
      });
  }
});
popupWithAvatar.setEventListeners();
