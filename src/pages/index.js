import './index.css';
import {
  profileButtonEdit,
  profileButtonAdd,
  inputName,
  inputDescription,
  templateCard,
  gallery,
  formAddCard,
  formEdit,
  formAvatar,
  popupEdit,
  popupAddCard,
  popupCardImg,
  popupAvatar,
  popupDeleteCard,
  profileButtonAvatar,
  profilePhoto,
  objElements,
  configApi
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
const requestApi = new Api(configApi)

const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
const validFormAvatar = new FormValidator(objElements, formAvatar);
validFormAvatar.enableValidation();
validFormEdit.enableValidation();
validFormAddCard.enableValidation();

// попап подтверждения удаления
const popupWithConfirm = new PopupWithConfirm(popupDeleteCard);
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
        console.log(res.likes);
        newBuildCard.setFavorites(res.likes)
      }).catch(err => { console.warn(`Ошибка при удалении лайка: ${err}`) })

  } else {
    requestApi.likeCardServer(idCard)
      .then(res => {
        console.log(res.likes);
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
    templateCard);
  return newBuildCard.createTemplateCard();
}

// рендер карточек
const printCards = new Section(
  {
    renderer: (elementCard) => {
      printCards.addItem(getReadyCard(elementCard));
    }
  }, gallery);

// отрисовка существующих начальных карточек на сервере
function printInitialCards() {
  requestApi.getInitialCards()
    .then(cards => {
      printCards.printElement(cards);
    }).catch(err => Promise.reject(`Ошибка с карточками загружеными с сервера: ${err}`));
}
printInitialCards();

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
const popupWithFormAdd = new PopupWithForm(popupAddCard, handleDataCard);


// Отправка на сервер профиля.
const popupWithFormProfile = new PopupWithForm(popupEdit, () => {
  const userProfileResult = userProfile.setUserInfo(inputName, inputDescription, profilePhoto.src);
  requestApi.changeProfileInfo(userProfileResult)
    .then(() => popupWithFormProfile.close())
    .catch(err => Promise.reject(`Ошибка при отправке профиля: ${err}`))
    .finally(() => {
      popupWithFormProfile.loadingStatus(false);
    });
});

const popupWithImage = new PopupWithImage(popupCardImg);
const userProfile = new UserInfo({ name: '.profile__name', description: '.profile__description', avatar: '.profile__photo' });


const editAvatar = new PopupWithForm(popupAvatar, (avatarPhoto) => {
  requestApi.addAvatarServer(avatarPhoto)
    .then(() => editAvatar.close())
    .catch(err => Promise.reject(`Ошибка при добавлении аватара: ${err}`))
    .finally(() => {
      editAvatar.loadingStatus(false);
    });
  profilePhoto.src = avatarPhoto.formText;
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

// получение данных с сервера для заполнения профеля
requestApi.getProfileInfo()
  .then(profileInfo => {
    const objsData = {
      serverName: profileInfo.name,
      serverJob: profileInfo.about,
      serverAvatar: profileInfo.avatar
    }
    return objsData;
  })
  .then(objsData => {
    userProfile.getUserInfo(objsData);
  })
  .catch(err => Promise.reject(`Ошибка с профилем: ${err}`));


profileButtonEdit.addEventListener('click', function () {
  popupWithFormProfile.open();
  // получаем объект с данными полей из инпута

  requestApi.getProfileInfo()
    .then(profileInfo => {
      const objsData = {
        serverName: profileInfo.name,
        serverJob: profileInfo.about,
        serverAvatar: profileInfo.avatar
      }
      return objsData;
    })
    .then(objsData => {
      const profileData = userProfile.getUserInfo(objsData);

      // копирования данных в поля инпута из профиля
      inputName.value = profileData.name;
      inputDescription.value = profileData.description;
      validFormEdit.disableSubmitButton();
      validFormEdit.resetInputErorr();
    })
    .catch(err => Promise.reject(`Ошибка при получении профиля: ${err}`));
});


popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
