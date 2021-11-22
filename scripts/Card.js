//import { popupMenuOpen, popupImageText, cardImage, popupImage } from './index.js';

export default class Card {
  constructor(data, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
  }

  _setEventListeners() {
    const eraseButton = this._templateElement.querySelector(".card__erase");
    const likeButton = this._templateElement.querySelector('.card__like-button');

    eraseButton.addEventListener('click', function () {
      this._templateElement.remove();
    });

    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_active')
    });

    this._templateElement.querySelector('.card__image').addEventListener('click', () => {
      popupMenuOpen(popupImageMenu);
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupImageText.textContent = this._name;
    });
  }

  render() {
    this._templateElement = this._templateElement.querySelector('.card').cloneNode(true);
    this._templateElement.querySelector('.card__text').textContent = this._name;
    this._templateElement.querySelector('.card__image').src = this._link;
    this._templateElement.querySelector('.card__image').alt = this._name;

    this._setEventListeners();

    return this._templateElement;
  }
}
