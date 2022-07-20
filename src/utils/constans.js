const container = document.querySelector('.root');
const profileButtonEdit = container.querySelector('.profile__btn-edit');
const profileButtonAdd = container.querySelector('.profile__btn-add');
const inputName = document.querySelector('#inputEditName');
const inputDescription = document.querySelector('#inputEditText');

const gallery = container.querySelector('.gallery');

const formAddCard = container.querySelector('#formAdd');
const formEdit = document.querySelector('#formEdit');
const formAvatar = document.querySelector('#formAddAvatar');

const profileButtonAvatar = document.querySelector('.profile__edit-icon');

const objElements = {
  formSelector: '.form',
  inputSelector: '.popup__edit-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup_btn-disable',
  inputErrorSelector: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

const selectorPopup = {
  template: '#tempCard',
  edit: '#popupEdit',
  addCard: '#popupAddCard',
  cardImg: '#popupCardImg',
  avatar: '#popupAvatar',
  deleteCard: '#popupDeleteCard'
}


export {
  profileButtonEdit,
  profileButtonAdd,
  inputName,
  inputDescription,
  gallery,
  formAddCard,
  formEdit,
  formAvatar,
  profileButtonAvatar,
  objElements,
  selectorPopup
};
