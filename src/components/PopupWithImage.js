import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageSubtitle) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageSubtitle = popupImageSubtitle;
  }

  openPopup(name, link) {
    super.openPopup();
    this._popupImageSubtitle.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}
