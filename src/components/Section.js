export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
