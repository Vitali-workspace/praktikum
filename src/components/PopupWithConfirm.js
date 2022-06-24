import { Popup } from "./Popup";
class PopupWithConfirm extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._submitDelete = this._searchOpenedPopup.querySelector('.form');
  }

  submitDeleteCard(callback) {
    this._btnSubmitCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitDelete.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._btnSubmitCallback();
    });
  }

}

export { PopupWithConfirm }
