export default class Card {
  constructor(data, cardSelector) {
    this._image = data.image;
    this._name = data.name;
    this._link = data.link;
    this._like = data.like;
    this._delete = data.delete;
  }

  _getTemplate() {
    const cardElement = document.getElementById('cards').content.firstElementChild.cloneNode(true);
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    /*this._element.querySelector('.element__like');
    this._element.querySelector('.element__delete');*/

    return this._element;
  }
}