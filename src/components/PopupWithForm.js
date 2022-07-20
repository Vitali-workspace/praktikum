import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(selectorPopup, submitFormCallback) {
    super(selectorPopup);
    this._submitFormCallback = submitFormCallback;
    this._popupForm = this._elementPopup.querySelector('.form');
    this._inputsList = this._elementPopup.querySelectorAll('.popup__edit-input');
    this._submitButtonForm = this._elementPopup.querySelector('.popup__btn-save');
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

  loadingStatus(loadingStatus) {
    if (loadingStatus == true) {
      this._submitButtonForm.innerText = 'Сохранение...';  // включение загрузки
    } else if (loadingStatus == false) {
      this._submitButtonForm.innerText = 'Сохранить';
    } else if (loadingStatus == 'createCard') {
      this._submitButtonForm.innerText = 'Создать';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.loadingStatus(true);
    });
  }
}

export { PopupWithForm };
