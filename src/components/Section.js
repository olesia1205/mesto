export default class Section {
  constructor({items, renderer}, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
