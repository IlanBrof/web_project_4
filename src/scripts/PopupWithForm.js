import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const inputInfo = {};
    const inputList = this._popup.querySelectorAll('.popup-menu__input');
    inputList.forEach((item) => inputInfo[item.name] = item.value);
    return inputInfo;
  }

  close() {
    super.close();
    this._popup.querySelector('.popup-menu__submit-form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup-menu__close-button').addEventListener('click', () => { this.close() })
    this._popup.addEventListener('submit', this._formSubmit);
  }
}
