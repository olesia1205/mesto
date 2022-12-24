import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageSubtitle) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageSubtitle = popupImageSubtitle;
  }

  openPopup() {
    super.openPopup(text, link);
    this._popupImageSubtitle.textContent = text;
    this._popupImage.src = link;
    this._popupImage.alt = text;
  }
}
