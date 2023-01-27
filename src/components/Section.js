export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item))
  }

  appendItem(itemHtml) {
    this._container.append(itemHtml);
  }

  prependItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
