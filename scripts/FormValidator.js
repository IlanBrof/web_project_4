export default class FormValidator {
  constructor(formSettings, formElement) {
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass
    this._formElement = formElement;
  }

  _checkInitialformValidity() {
    const inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputElements.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleSubmitBtn(inputElements, buttonElement);
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
    const inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    const hasValidInput = inputElements.some((inputElement) => !inputElement.validity.valid);
    if (hasValidInput) {
      buttonElement.classList.add(this._inactiveButtonClass);
  } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputElements = [...this._formElement.querySelectorAll(this._inputSelector)];
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleSubmitBtn();

    inputElements.forEach((inputElement) => {
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
