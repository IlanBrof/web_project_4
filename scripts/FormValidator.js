export default class FormValidator {
  constructor(formSettings, formElement) {
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;
    this._formElement = formElement;
    this._inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  checkInitialformValidity() {
    this._inputElements.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleSubmitBtn(this._inputElements, this._buttonElement);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _toggleSubmitBtn() {
    const hasValidInput = this._inputElements.some((inputElement) => !inputElement.validity.valid);
    if (hasValidInput) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
  } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleSubmitBtn();

    this._inputElements.forEach(( inputElement, buttonElement ) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitBtn(inputElement, buttonElement);
      });
    });
  }

  enableValidation() {
      this._formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
    this._setEventListeners();
  }


}
