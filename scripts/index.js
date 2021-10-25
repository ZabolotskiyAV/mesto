import { initialCards } from "./initial-cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

/** Находим попапы и элементы */
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');
const imgBigSize = document.querySelector('.popup__image');

/** Находим кнопки */
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditClose = document.querySelector('.popup__close-button_edit');
const btnImgClose = document.querySelector('.popup__close-button_img');
const btnAddCardClose = document.querySelector('.popup__close-button_addcard');
const btnAddCard = document.querySelector('.profile__add-button');

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

/** Настройки для валидатора */
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/** Создаем карточку с помощью класса */
function createCard(data) {
  return new Card(data, '.element', handleOpenImage);
}

/** Обработчик создания и добавления карточки в DOM */
function renderCard(card) {
  const cardElement = card.generateCard(); // Изначально вызов был в функции 
  // createCard, но после просмотра вебинара Q&A с наставником - перенёс
  document.querySelector('.elements').prepend(cardElement);
}

/** Добавляем карточки из массива с помощью класса */
initialCards.forEach((item) => {
  const card = createCard(item);
  renderCard(card);
});

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
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
     closePopup(evt.target);
    };
   });
});

/** Обработчик редактирования профиля */
function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
}

/** Обработчик увеличения изображений */
function handleOpenImage(name, link) {
  imgBigSize.alt = name;
  imgBigSize.src = link;
  document.querySelector('.popup__image-title').textContent = name;
  openPopup(popupImg);
}

/** Обработчики закрытия попапов без сохранения */
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc)
}
function closePopupAdd() {
  formAdd.reset();
  closePopup(popupAdd);
}

/** Валидаторы форм */
const editProfileFormValidator = new FormValidator(config, formEdit);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, formAdd);
addCardFormValidator.enableValidation();

/** Обработчик отправки формы редактирования профиля */
function handleProfileFormSubmit () {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

/** Обработчик отправки формы с новой карточкой */
function handleCardFormSubmit() {
  // Сохраняем данные из формы в объект
  const cardObj = {name: cardNameInput.value, link: linkImageInput.value};  
  const card = createCard(cardObj);
  renderCard(card);

  const popupBtn = formAdd.querySelector('.popup__button');
  popupBtn.setAttribute('disabled', '');
  popupBtn.classList.add('popup__button_disabled');
  // addCardFormValidator.toggleButtonState();
  // Отключает кнопку только при добавлении каждой второй карточки, не смог починить
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