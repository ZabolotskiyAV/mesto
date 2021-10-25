export default class Card {
  constructor(data, cardSelector, handleOpenImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenImage = handleOpenImage;
  }

  /** Находим и копируем шаблон карточки */
  _getTemplate() {
    const cardElement = document.getElementById('cards').content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  /** Создаем обработчики открытия картинки, лайка и удаления карточки */
  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
    
  /** Создаём карточку с данными */
  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.element__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    
    /** Добавляем слушатели */
    cardImage.addEventListener('click', () => {
      this._handleOpenImage(this._name, this._link);
    });
    this._element
    .querySelector('.element__like')
    .addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._element
    .querySelector('.element__delete')
    .addEventListener('click', () => {
      this._handleDeleteCard();
    });
    
    return this._element;
  }
}