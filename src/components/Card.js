import { popupImage, popupImageName } from "../pages/index.js";

class Card {
  constructor(dataNewCard,
    handleCardClick,
    handleLikeClick,
    handleRemoveIconClick,
    selectorTemplateCard) {

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveIconClick = handleRemoveIconClick;
    this._idCard = dataNewCard._id;
    this._idOwner = dataNewCard.owner._id; // id других пользователей
    this._idMyUser = '4987bc3550b8e71731203311';
    this._listUserLikes = dataNewCard.likes;

    this._nameCard = dataNewCard.name;
    this._linkCard = dataNewCard.link;
    this._popupImageName = popupImageName;
    this._selectorTemplateCard = selectorTemplateCard;
    this._templateCardContent = this._selectorTemplateCard
      .querySelector('.gallery__card')
      .cloneNode(true);
  }

  createTemplateCard() {
    this._galleryCardImage = this._templateCardContent.querySelector('.gallery__card-img');
    this._templateCardContent.querySelector('.gallery__card-name').textContent = `${this._nameCard}`;
    this._galleryCardImage.src = `${this._linkCard}`;
    this._galleryCardImage.alt = `${this._nameCard}`;
    this._buttonLike = this._templateCardContent.querySelector('.gallery__btn-favorites');

    this._hiddenBtnTrash();
    this._counterLikes();
    this._setEventListeners();
    this.setFavorites(this._listUserLikes);
    return this._templateCardContent;
  }

  _checkLikes() {
    return this._listUserLikes.some(item => {
      return item._id == this._idMyUser
    })
  }

  // проверка лайков
  setFavorites(listLike) {
    this._templateCardContent.querySelector('.gallery__counter-favorites').textContent = listLike.length;
    this._listUserLikes = listLike;

    if (this._checkLikes()) {
      // ставим лайк
      this._buttonLike.classList.add('gallery__btn-favorites_active');
    } else {
      // снятие лайка
      this._buttonLike.classList.remove('gallery__btn-favorites_active');
    }
  }

  _hiddenBtnTrash() {
    const notMyIdCard = this._idMyUser !== this._idOwner;
    if (notMyIdCard) {
      this.deleteTrashIcon = this._templateCardContent.querySelector('.gallery__btn-trash').style.visibility = 'hidden';
    }
  }

  removeCard() {
    this._templateCardContent.remove();
    this._templateCardContent = null;
  }

  _counterLikes() {
    let counter = this._templateCardContent.querySelector('.gallery__counter-favorites');
    counter.textContent = this._listUserLikes.length;
  }

  _openImagePopup() {
    popupImage.src = `${this._linkCard}`;
    popupImage.alt = `${this._nameCard}`;
    this._popupImageName.textContent = `${this._nameCard}`;
    this._handleCardClick(this._nameCard, this._linkCard);
  }

  _setEventListeners() {
    this._templateCardContent.querySelector('.gallery__btn-favorites').addEventListener('click', () => {
      this._handleLikeClick(this._idCard, this._checkLikes(), this);
    });
    this._templateCardContent.querySelector('.gallery__btn-trash').addEventListener('click', () => {
      this._handleRemoveIconClick(this._idCard, this);
    });
    this._templateCardContent.querySelector('.gallery__card-img').addEventListener('click', () => this._openImagePopup());
  }
}

export { Card };
