export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup-menu') || evt.target.classList.contains('popup-menu__close-button')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup-menu_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup-menu_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode === "Escape") {
      this.close()
    }
  }
}
