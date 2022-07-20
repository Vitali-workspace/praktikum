class Popup {
  constructor(selectorPopup) {
    this._elementPopup = document.querySelector(selectorPopup);
    this._buttonPopupClose = this._elementPopup.querySelector('.popup__btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._elementPopup.classList.remove('popup_opened');
    this._elementPopup.classList.remove('popup_close'); // анимация попапа
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._elementPopup.classList.add('popup_opened');
    this._elementPopup.classList.add('popup_close');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonPopupClose.addEventListener('click', () => this.close());
    this._elementPopup.addEventListener('mousedown', (evt) => this._closePopupOnOverlay(evt));
  }
}

export { Popup };
