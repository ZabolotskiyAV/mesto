/** Импортируем модули */
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

/** Находим шаблон */
const template = document.getElementById('cards');

/** Находим список элементов */
const elements = document.querySelector('.elements');

/** Находим попапы */
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

/** Находим кнопки */
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditClose = document.querySelector('.popup__close-button_edit');
const btnImgClose = document.querySelector('.popup__close-button_img');
const btnAddCardClose = document.querySelector('.popup__close-button_addcard');
const btnAddCard = document.querySelector('.profile__add-button');
const btnDelete = document.querySelector('.element__delete');

/** Находим формы в DOM */
const formEdit = document.querySelector('.editProfile');
const formAdd = document.querySelector('.add-card');

/** Находим поля форм в DOM */
const nameInput = document.getElementById('inputProfileName');
const jobInput = document.getElementById('inputProfileDescription');
const cardNameInput = document.getElementById('inputCardName');
const linkImageInput = document.getElementById('inputLinkImage');

/** Находим поля для формы в DOM */
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

/** Создание карточки 
function createCard(name, link) {
  const newCard = template.content.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const cardLike = newCard.querySelector('.element__like');
  const cardDelete = newCard.querySelector('.element__delete');
  cardImage.alt = name;
  cardImage.src = link;
  cardTitle.textContent = name;
  cardLike.addEventListener('click', handleLikeCard); // слушатель лайка
  cardDelete.addEventListener('click', handleDeleteCard); // слушатель корзины
  cardImage.addEventListener('click', handleOpenImage); // слушатель картинки

  return newCard;
}*/

/** Добавляение карточки в DOM дерево 
function addCard(card) {
  const newCard = createCard(card.name, card.link);
  elements.prepend(newCard);
}*/

/** Добавление карточек из массива 
initialCards.forEach(addCard);*/
initialCards.forEach((item) => {
  const card = new Card(item, '.element');
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
});

/** Обработчик лайка */
function handleLikeCard(evt) {
  const elementLikeBtn = evt.target;
  elementLikeBtn.classList.toggle('element__like_active');
}

/** Обработчик удаления */
function handleDeleteCard(evt) {
  evt.target.closest('.element').remove();
}

/** Закрытие попапа при нажатии Escape */
const closeByEsc = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

/** Обработчики открытия попапа */
function openPopup(popup) {  
  popup.classList.add('popup_opened');
  // Закрываем все попапы при нажатии Escape
  document.addEventListener('keydown', closeByEsc);
}

/** Закрываем попап при клике вне попапа */
const popupList = document.querySelectorAll('.popup'); // Создаём список всех попапов
popupList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
     closePopup(evt.target);
    };
   });
});

/** Обработчик редактирования профиля */
function openPopupEdit() {
  openPopup(popupEdit);
  // Задаем значения полям формы из полей
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
}

/** Обработчик увеличения изображений */
function handleOpenImage(evt) {
  const image = evt.target;
  document.querySelector('.popup__image').src = image.src;
  document.querySelector('.popup__image').alt = image.alt;
  document.querySelector('.popup__image-title').textContent = image.alt;
  openPopup(popupImg);
}

/** Обработчики закрытия попапов без сохранения */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
function closePopupAdd() {
  formAdd.reset();
  closePopup(popupAdd);
}

/** Обработчики «отправки» форм */
function handleProfileFormSubmit (evt) {
  // evt.preventDefault(); // Отменяем перезагрузку страницы после «отправки» формы - добавлено в файле валидации
  // Задаем значения полям формы из полей
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // Закрываем попап
  closePopup(popupEdit);
}
function handleCardFormSubmit (evt) {
  // evt.preventDefault(); // Отменяем перезагрузку страницы после «отправки» формы - добавлено в файле валидации  
  addCard({name: cardNameInput.value, link: linkImageInput.value}); // Создаем карточку из шаблона с картинкой и названием от пользователя
  disableSubmitButton(formAdd.querySelector('.popup__button'), config.inactiveButtonClass);
  closePopupAdd();
}

/** Следим за событиями открытия и закрытия попапов */
btnEdit.addEventListener('click', openPopupEdit);
btnEditClose.addEventListener('click', () => closePopup(popupEdit));
btnAddCard.addEventListener('click', () => openPopup(popupAdd));
btnAddCardClose.addEventListener('click', closePopupAdd);
btnImgClose.addEventListener('click', () => closePopup(popupImg));


/** Прикрепляем слушателей к формам: 
* они будут следить за событием submit - «отправка»
*/
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleCardFormSubmit);