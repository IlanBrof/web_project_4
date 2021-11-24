import { openPopup } from './utils.js';
import { popupImageMenu, popupImage, popupImageText } from './index.js';
export default class Card {
  constructor(cardData, templateElementSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = document.querySelector(templateElementSelector).content.querySelector('.card');
  }
  _addEventListeners() {
    this._imageEraseButton();
    this._cardLikeButton();
    this._cardImagePopupButton();
  }

  _imageEraseButton() {
    const eraseButton = this._element.querySelector('.card__erase');
    eraseButton.addEventListener('click', function () {
      eraseButton.closest('.card').remove();
    });
  }

  _cardLikeButton() {
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_active')
    });
  }

  _cardImagePopupButton() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      openPopup(popupImageMenu);
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupImageText.textContent = this._name;
    });
  }
    render() {
      this._element = this._template.cloneNode(true);
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__image').alt = this._name;
      this._element.querySelector('.card__text').textContent = this._name;
      this._addEventListeners();

      return this._element;
    }
}
