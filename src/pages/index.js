import './index.css';
import {
  profileButtonEdit,
  profileButtonAdd,
  inputName,
  inputDescription,
  gallery,
  formAddCard,
  formEdit,
  formAvatar,
  profileButtonAvatar,
  profilePhoto,
  objElements,
  selectorPopup
} from '../utils/constans.js';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

// отправляет запросы на сервер
const requestApi = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-40/',
  headers: {
    authorization: '6e087a0f-c27a-43c1-a0e6-91ac2272b53b',
    'Content-Type': 'application/json'
  }
});

const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
const validFormAvatar = new FormValidator(objElements, formAvatar);
validFormAvatar.enableValidation();
validFormEdit.enableValidation();
validFormAddCard.enableValidation();

// попап подтверждения удаления
const popupWithConfirm = new PopupWithConfirm(`${selectorPopup.deleteCard}`);
popupWithConfirm.setEventListeners();

// отвечает за открытие картинки в попапе
function handleCardClick(nameCard, linkCard) {
  popupWithImage.open(nameCard, linkCard);
}

// функция управления лайками
function handleLikeClick(idCard, isLike, newBuildCard) {

  if (isLike) {
    requestApi.deletelikeCardServer(idCard)
      .then(res => {
        newBuildCard.setFavorites(res.likes)
      }).catch(err => { console.warn(`Ошибка при удалении лайка: ${err}`) })

  } else {
    requestApi.likeCardServer(idCard)
      .then(res => {
        newBuildCard.setFavorites(res.likes)
      }).catch(err => { console.warn(`Ошибка при установлении лайка: ${err}`) })
  }
}

// колбэк клика на корзину.
function handleRemoveIconClick(id, card) {
  popupWithConfirm.submitDeleteCard(() => { confirmDeleteCard(id, card) });
  popupWithConfirm.open();
}
// функция для удаления карточек на сервере
function confirmDeleteCard(id, card) {
  requestApi.deleteCardServer(id)
    .then(res => {
      card.removeCard();
      popupWithConfirm.loadingStatus(false);
      popupWithConfirm.close();
    })
    .catch(err => Promise.reject(`Ошибка при удалении карточки: ${err}`))
}

// возвращает готовую карточку
function getReadyCard(dataCards) {
  const newBuildCard = new Card(
    dataCards,
    handleCardClick,
    handleLikeClick,
    handleRemoveIconClick,
    selectorPopup,
    myIdUser);
  return newBuildCard.createTemplateCard();
}

// рендер карточек
const printCards = new Section(
  {
    renderer: (elementCard) => {
      printCards.addItem(getReadyCard(elementCard));
    }
  }, gallery);

// Добавление карточки на сервер пользователем
function handleDataCard(iputsInfo) {

  requestApi.addCardServer(iputsInfo)
    .then(newUserCard => {
      const newCard = getReadyCard(newUserCard);
      printCards.addItemUser(newCard);
      popupWithFormAdd.close();
    })
    .catch(err => Promise.reject(`Ошибка при добавлении карточки: ${err}`))
    .finally(() => {
      popupWithFormAdd.loadingStatus('createCard');
    });
}
const popupWithFormAdd = new PopupWithForm(`${selectorPopup.addCard}`, handleDataCard);


// Отправка на сервер заполненого профиля.
const popupWithFormProfile = new PopupWithForm(`${selectorPopup.edit}`, () => {
  let profileData = { name: inputName.value, about: inputDescription.value, avatar: profilePhoto.src }

  requestApi.changeProfileInfo(profileData)
    .then((res) => {
      userProfile.setUserInfo(res);
      popupWithFormProfile.close();
    })
    .catch(err => Promise.reject(`Ошибка при отправке профиля: ${err}`))
    .finally(() => {
      popupWithFormProfile.loadingStatus(false);
    });
});

const popupWithImage = new PopupWithImage(`${selectorPopup.cardImg}`);
const userProfile = new UserInfo({ name: '.profile__name', description: '.profile__description', avatar: '.profile__photo' });


const editAvatar = new PopupWithForm(`${selectorPopup.avatar}`, (avatarPhoto) => {
  requestApi.addAvatarServer(avatarPhoto)
    .then((res) => {
      userProfile.setUserInfo(res);
      editAvatar.close();
    })
    .catch(err => Promise.reject(`Ошибка при добавлении аватара: ${err}`))
    .finally(() => {
      editAvatar.loadingStatus(false);
    });
});
editAvatar.setEventListeners();

// функция кнопки редактирования аватара
function popupEditAvatar() {
  editAvatar.open();
  validFormAvatar.disableSubmitButton();
  validFormAvatar.resetInputErorr();
}
profileButtonAvatar.addEventListener('click', popupEditAvatar);


profileButtonAdd.addEventListener('click', function () {
  popupWithFormAdd.open();
  validFormAddCard.disableSubmitButton();
  validFormAddCard.resetInputErorr();
});

// получение данных с сервера для заполнения профиля
requestApi.getProfileInfo()
  .then((profileInfo) => {
    const objsData = {
      name: profileInfo.name,
      about: profileInfo.about,
      avatar: profileInfo.avatar
    }
    userProfile.setUserInfo(objsData);
  })
  .catch(err => Promise.reject(`Ошибка с профилем: ${err}`));


profileButtonEdit.addEventListener('click', function () {
  popupWithFormProfile.open();
  // получаем объект с данными полей из инпута

  requestApi.getProfileInfo()
    .then(() => {
      const profileData = userProfile.getUserInfo();

      // подставление данных в поля инпута в момент открытия попапа
      inputName.value = profileData.name;
      inputDescription.value = profileData.about;
      validFormEdit.disableSubmitButton();
      validFormEdit.resetInputErorr();
    })
    .catch(err => Promise.reject(`Ошибка при получении профиля: ${err}`));
});

popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();

Promise.all([requestApi.getProfileInfo(), requestApi.getInitialCards()])
  .then(([infoUser, initialCards]) => {
    // отправка данных о пользователе с сервера
    userProfile.setUserInfo(infoUser);

    myIdUser = infoUser._id;
    // отрисовка существующих начальных карточек на сервере
    printCards.printElement(initialCards);
  })
  .catch(err => Promise.reject(`Ошибка получения промисов карточек и id пользователя: ${err}`));

let myIdUser;
