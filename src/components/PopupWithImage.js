import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open = ( {  link, text } ) => {
    const popupImage = this._popup.querySelector('.popup-menu__image');
    const popupImageText = this._popup.querySelector('.popup-menu__text');

      popupImage.src = link;
      popupImage.alt = `Image ${link}`;
      popupImageText.textContent = text;

    super.open();
  }

}
