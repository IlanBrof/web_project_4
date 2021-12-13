
import { _ } from 'core-js';
export default class Card {
  constructor(cardData, templateElementSelector, onImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = document.querySelector(templateElementSelector).content.querySelector('.card');
    this._onImageClick = onImageClick;
  }
  _setEventListeners() {
    this._imageEraseButton();
    this._cardLikeButton();

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._cardImagePopupButton();
    });
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
    this._onImageClick({ link: this._link, text: this._name });
  }
    renderCard() {
      this._element = this._template.cloneNode(true);
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__image').alt = this._name;
      this._element.querySelector('.card__text').textContent = this._name;
      this._setEventListeners();

      return this._element;
    }
}