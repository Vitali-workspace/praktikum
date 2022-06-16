//! Позже удали initialCards


import './index.css';
import {
  initialCards,
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


// отправляет запросы на сервер
const requestApi = new Api(configApi);


// const testprom = new Promise(function (resolve, reject) {
//   const answer = requestApi.getProfileInfo();
//   resolve(console.log('www'));
//   reject('вот уж ошибка');
// })
// console.log(testprom);


//================================================================
const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
validFormEdit.enableValidation();
validFormAddCard.enableValidation();

// отвечает за открытие картинки в попапе
function handleCardClick(nameCard, linkCard) {
  popupWithImage.open(nameCard, linkCard);
}

// возвращает готовую карточку
function getReadyCard(parametersCard) {
  const newBuildCard = new Card(parametersCard, handleCardClick, templateCard);
  return newBuildCard.createTemplateCard();
}

// рендер карточек
requestApi.getInitialCards()
  .then(cards => {
    const printCards = new Section(
      {
        items: cards,
        renderer: (elementCard) => {
          printCards.addItem(getReadyCard(elementCard));
        }
      }, gallery);

    printCards.printElement()
  }).catch(err => Promise.reject(`произошла Ужасная ошибка с профилем: ${err}`));

//===============================================
function handleDataCard() {
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  }
  const elementCard = getReadyCard(newCard);
  printCards.addItem(elementCard);
  validFormAddCard.disableSubmitButton();
}

const popupWithFormAdd = new PopupWithForm(popupAddCard, handleDataCard);
const popupWithFormProfile = new PopupWithForm(popupEdit, () => {
  userProfile.setUserInfo(inputName, inputDescription);
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
    console.log(profileDatas);
  })
  .catch(err => console.log('Ужасная ошибка'))

//=================
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
    .catch(err => console.log('Ужасная ошибка в профиле'))
});

popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();


export { popupImage, popupImageName };
