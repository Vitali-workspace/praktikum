const container = document.querySelector('.root');
const profileButtonEdit = container.querySelector('.profile__btn-edit');
const profileButtonAdd = container.querySelector('.profile__btn-add');
const inputName = document.querySelector('#inputEditName');
const inputDescription = document.querySelector('#inputEditText');

const templateCard = document.querySelector('#tempCard').content;
const gallery = container.querySelector('.gallery');

const newCardName = container.querySelector('#inputAddName');
const newCardLink = container.querySelector('#inputAddLink');

const formAddCard = container.querySelector('#formAdd');
const formEdit = document.querySelector('#formEdit');

const popupEdit = container.querySelector('#popupEdit');
const popupAddCard = container.querySelector('#popupAddCard');

const popupCardImg = container.querySelector('#popupCardImg');
const popupImage = container.querySelector('.popup__image');
const popupImageName = container.querySelector('.popup__image-name');

const popupAvatar = document.querySelector('#popupAvatar');
const popupDeleteCard = document.querySelector('#popupDeleteCard');

const objElements = {
  formSelector: '.form',
  inputSelector: '.popup__edit-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup_btn-disable',
  inputErrorSelector: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

const configApi = {
  tokenAuthorization: '6e087a0f-c27a-43c1-a0e6-91ac2272b53b',
  profileInfoUrl: 'https://nomoreparties.co/v1/cohort-40/users/me',
  profileAvatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar',
  deleteCardUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/cards/cardId',
  likeCardUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/cards/cohort-40/likes',
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/cards'
}

export {
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
};
