export default class Section {
  constructor({items, renderer}, selector) {
    this.renderer = renderer;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
