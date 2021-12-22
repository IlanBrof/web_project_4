export default class Section {
  constructor({ items, renderer }, elementSelector) {
    this._items = items;
    this._renderer = renderer;
    this._elementContainer = document.querySelector(elementSelector);
  }
  renderer() {
    this._items.forEach(element => {
      this._element = this._renderer(element)
    });
  }

    addItem(element) {
      this._elementContainer.prepend(element);
    }
}
