const initialCards = [
  {
    name: 'Сиди-Бель-Аббес',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Вашингтон',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Луанда',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Соломоновы Острова',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Шанхай',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Тегеран',
    link: 'https://cdn.pixabay.com/photo/2022/02/17/07/51/church-7018154_960_720.jpg'
  }
];

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
};
