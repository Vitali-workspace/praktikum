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
  objElements
} from '../utils/constans.js';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';


const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
validFormEdit.enableValidation();
validFormAddCard.enableValidation();

// отвечает за открытие картинки в попапе
function handleCardClick(nameCard, linkCard) {
  popupWithImage.open(nameCard, linkCard);
}

function getReadyCard(parametersCard) {
  const newBuildCard = new Card(parametersCard, handleCardClick, templateCard);
  return newBuildCard.createTemplateCard();
}

const printCards = new Section(
  {
    items: initialCards,
    renderer: (elementCard) => {
      printCards.addItem(getReadyCard(elementCard));
    }
  }, gallery);

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

profileButtonEdit.addEventListener('click', function () {
  popupWithFormProfile.open();
  // получаем объект с данными полей из инпута
  const profileData = userProfile.getUserInfo();
  // копирования данных в поля инпута из профеля
  inputName.value = profileData.name;
  inputDescription.value = profileData.description;
  validFormEdit.resetInputErorr();
});

popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
printCards.printElement();

export { popupImage, popupImageName };
