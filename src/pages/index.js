import './index.css';
import {
  profileButtonEdit,
  profileButtonAdd,
  inputName,
  inputDescription,
  templateCard,
  gallery,
  newCardName,
  newCardLink,
  formAddCard,
  formEdit,
  popupEdit,
  popupAddCard,
  popupCardImg,
  popupImage,
  popupImageName,
  popupAvatar,
  popupDeleteCard,
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
const requestApi = new Api(configApi);

const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
validFormEdit.enableValidation();
validFormAddCard.enableValidation();

// попап подтверждения удаления
const popupWithConfirm = new PopupWithConfirm(popupDeleteCard);
popupWithConfirm.setEventListeners();

// отвечает за открытие картинки в попапе
function handleCardClick(nameCard, linkCard) {
  popupWithImage.open(nameCard, linkCard);
}

function handleLikeClick() {
  //! api dislike
}

//===================================
// колбэк клика на корзину.
function handleRemoveIconClick(id, card) {
  popupWithConfirm.submitDeleteCard(() => { ConfirmDeleteCard(id, card) });
  popupWithConfirm.open();
}
// функция для удаления карточек на сервере
function ConfirmDeleteCard(id, card) {
  requestApi.deleteCardServer(id)
    .then(res => {
      //card.remove();
      //! не работает удаление из dom
      popupWithConfirm.close();
    })
    .catch(err => Promise.reject(`Ошибка при удалении карточки: ${err}`))
}
//==================================

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

// отрисовка существующих карточек на сервере
//! id
requestApi.getInitialCards()
  .then(cards => {
    printCards.printElement(cards);
  }).catch(err => Promise.reject(`Ошибка с карточками загружеными с сервера: ${err}`));


// Добавление карточки на сервер пользователем
function handleDataCard(iputsInfo) {
  requestApi.addCardServer(iputsInfo)
    .then(res => {
      return newCard = {
        name: newCardName.value,
        link: newCardLink.value
      }
    })
    .then(res => {
      const elementCard = getReadyCard(res);
      printCards.addItemUser(elementCard);
      validFormAddCard.disableSubmitButton();
      return res;
    })
    .catch(err => Promise.reject(`Ошибка с карточкой на сервере: ${err}`))
}

const popupWithFormAdd = new PopupWithForm(popupAddCard, handleDataCard);


function ProfileInfo(newProfileInfo) {
  requestApi.changeProfileInfo(newProfileInfo);
}

// Отправка на сервер профиля.
const popupWithFormProfile = new PopupWithForm(popupEdit, () => {
  const userProfileResult = userProfile.setUserInfo(inputName, inputDescription);
  ProfileInfo(userProfileResult);
});

const popupWithImage = new PopupWithImage(popupCardImg);
const userProfile = new UserInfo({ name: '.profile__name', description: '.profile__description' });

profileButtonAdd.addEventListener('click', function () {
  popupWithFormAdd.open();
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
    const profileDatas = userProfile.getUserInfo(objsData);
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
      console.log(profileData);

      // копирования данных в поля инпута из профиля
      inputName.value = profileData.name;
      inputDescription.value = profileData.description;
      validFormEdit.resetInputErorr();
    })
    .catch(err => Promise.reject(`Ошибка при получении профиля: ${err}`));
});

popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();


export { popupImage, popupImageName };
