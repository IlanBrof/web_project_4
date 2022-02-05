export default class Section {
  constructor({ renderer }, elementSelector) {
    this._renderer = renderer;
    this._elementContainer = document.querySelector(elementSelector);
  }
  renderer(cards) {
    cards.forEach(element => {
      this._element = this._renderer(element)
    });
  }

    addItem(element) {
      this._elementContainer.prepend(element);
    }
}
