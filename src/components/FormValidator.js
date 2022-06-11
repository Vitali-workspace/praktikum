export class FormValidator {
  constructor(parametersValidator, formElement) {

    this._form = formElement;
    this._parametersValidator = parametersValidator;
    const { submitButtonSelector, inputSelector } = this._parametersValidator;
    this._submitBtn = this._form.querySelector(submitButtonSelector);
    this._inputsList = Array.from(this._form.querySelectorAll(inputSelector));
  }

  _showInputError(input) {
    const errorInput = this._form.querySelector(`#${input.id}-error`);
    errorInput.classList.add(this._parametersValidator.errorClass);
  };

  _hideInputError(input) {
    const errorInput = this._form.querySelector(`#${input.id}-error`);
    errorInput.classList.remove(this._parametersValidator.errorClass);
  };

  _checkInputValidity(input) {
    const noValid = !input.validity.valid;

    if (noValid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners() {
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    // устанавка состояния сабмита на момент первого открытия попапа
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

    if (hasInvalidInput) {
      this.disableSubmitButton();
    } else {
      this._submitBtn.classList.remove(this._parametersValidator.inactiveButtonClass);
      this._submitBtn.removeAttribute('disabled');
    }
  }

  disableSubmitButton() {
    this._submitBtn.classList.add(this._parametersValidator.inactiveButtonClass);
    this._submitBtn.setAttribute('disabled', true);
  }

  resetInputErorr() {
    this._inputsList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
