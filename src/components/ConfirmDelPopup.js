import Popup from './Popup.js';

export default class ConfirmDelPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  confirmDeletion(onSubmit) {
    this._delConfirmed = onSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._delConfirmed();
    });
  }
}
