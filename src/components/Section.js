export default class Section {
  constructor({cardsData, renderer}, container) {
    this._cardsData = cardsData;
    this._renderer = renderer;
    this._container = container;
  }

  renderCards() {
    this._cardsData.forEach(cardData => this._renderer(cardData))
  }

  addCard(itemHtml) {
    this._container.append(itemHtml);
  }

  prependCard(cardElement) {
    this._container.prepend(cardElement);
  }
}
