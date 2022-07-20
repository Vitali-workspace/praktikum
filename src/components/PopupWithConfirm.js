import { Popup } from "./Popup";
class PopupWithConfirm extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._submitDelete = this._elementPopup.querySelector('.form');
    this._submitButtonForm = this._elementPopup.querySelector('.popup__btn-save');
  }

  submitDeleteCard(callback) {
    this._btnSubmitCallback = callback;
  }

  loadingStatus(loadingStatus) {
    if (loadingStatus == true) {
      this._submitButtonForm.innerText = 'Сохранение...';
    }
    else if (loadingStatus == false) {
      this._submitButtonForm.innerText = 'Да';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitDelete.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.loadingStatus(true);
      this._btnSubmitCallback();
    });
  }

}

export { PopupWithConfirm }
