import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(selectorPopup, submitFormCallback) {
    super(selectorPopup);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._searchOpenedPopup.querySelector('.form');
    this._inputsList = this._searchOpenedPopup.querySelectorAll('.popup__edit-input');
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  // собирает данные с полей по имени инпута в форме.
  _getInputValues() {
    this._resultForm = {};
    this._inputsList.forEach((input) => {
      this._resultForm[input.name] = input.value;
    });
    return this._resultForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });
  }
}

export { PopupWithForm };
