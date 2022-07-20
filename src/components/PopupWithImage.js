import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._elementPopup.querySelector('.popup__image');
    this._popupImageName = this._elementPopup.querySelector('.popup__image-name');
  }

  open(nameCard, linkCard) {
    super.open();
    this._popupImage.src = `${linkCard}`;
    this._popupImage.alt = `${nameCard}`;
    this._popupImageName.textContent = `${nameCard}`;
  }
}

export { PopupWithImage };
