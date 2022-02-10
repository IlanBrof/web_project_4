import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputList = this._popup.querySelectorAll('.popup-menu__input');
    this._submitForm = this._popup.querySelector('.popup-menu__submit-form');
  }

  _getInputValues() {
    const inputInfo = {};

    this._inputList.forEach(input => inputInfo[input.name] = input.value);
    return inputInfo;
  }

  close() {
    super.close();
    this._submitForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }
}
