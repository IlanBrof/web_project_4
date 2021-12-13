export default class Section {
  constructor({ items, renderer }, elementSelector) {
    this.items = items;
    this._renderer = renderer;
    this._elementSelector = document.querySelector(elementSelector);
  }
    renderer() {
      this._items.forEach(element => {
        this._element = this._renderer(element);
      });
    }

  addItem(element) {
      this._elementSelector.prepend(element);
    }
}
