const formElements = {
  formSelector: ".popup-menu__submit-form",
  inputSelector: ".popup-menu__input",
  submitButtonSelector: ".popup-menu__save-button",
  inactiveButtonClass: "popup-menu__save-button_disabled",
  inputErrorClass: "popup-menu__input_type_error",
  errorClass: "popup-menu__error_visible"
};

function showInputError(formElement, inputElement, formSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formSettings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(formSettings.errorClass);
};

function hideInputError(formElement, inputElement, formSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(formSettings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(formSettings.errorClass);
};

function checkInputValidity(formElement, inputElement, formSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, formSettings);
  } else {
    hideInputError(formElement, inputElement, formSettings);
  }
};

const toggleSubmitBtn = (inputElements, buttonElement, formSettings) => {
  const hasValidInput = inputElements.some((inputElement) => !inputElement.validity.valid);
  if (hasValidInput) {
    buttonElement.classList.add(formSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(formSettings.inactiveButtonClass);
  }
};

function setEventListeners(formElement, formSettings) {
  const inputElements = [...formElement.querySelectorAll(formSettings.inputSelector)];
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);
  toggleSubmitBtn(inputElements, buttonElement, formSettings);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, formSettings);
      toggleSubmitBtn(inputElements, buttonElement, formSettings);
    });
  });
}

function enableValidation(formSettings) {
  const forms = document.querySelectorAll(formSettings.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formSettings);
  });
}

function checkInitialformValidity(formElement, formSettings) {
  const inputElements = [...formElement.querySelectorAll(formSettings.inputSelector)];
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);
  toggleSubmitBtn(inputElements, buttonElement, formSettings);
}

enableValidation(formElements);
