// Первоначальный массив
const initialCards = [
  {
    name: 'Айгир',
    link: 'images/aigir.jpg'
  },
  {
    name: 'Водопад Атыш',
    link: 'images/atish.jpg'
  },
  {
    name: 'Голубое озеро',
    link: 'images/goluboe-ozero.jpg'
  },
  {
    name: 'Иремель',
    link: 'images/iremel.jpg'
  },
  {
    name: 'Красный ключ',
    link: 'images/krasniy-klych.jpg'
  },
  {
    name: 'Шиханы',
    link: 'images/shikhani.jpg'
  }
];

// Находим шаблон
const template = document.getElementById('cards');

// Находим список элементов
const elements = document.querySelector('.elements');


// Находим попапы
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

// Находим кнопки
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditClose = document.querySelector('.popup__close-button_edit');
const btnImgClose = document.querySelector('.popup__close-button_img');
const btnAddCardClose = document.querySelector('.popup__close-button_addcard');
const btnAddCard = document.querySelector('.profile__add-button');
const btnDelete = document.querySelector('.element__delete');

// Находим формы в DOM
const formEdit = document.querySelector('.editProfile');
const formAdd = document.querySelector('.addCard');

// Находим поля форм в DOM
const nameInput = document.getElementById('inputProfileName');
const jobInput = document.getElementById('inputProfileDescription');
const cardNameInput = document.getElementById('inputCardName');
const linkImageInput = document.getElementById('inputLinkImage');

// Находим поля для формы в DOM
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Создание карточки
function createCard(name, link) {
  const newCard = template.content.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const cardLike = newCard.querySelector('.element__like');
  const cardDelete = newCard.querySelector('.element__delete');
  cardImage.alt = name;
  cardImage.src = link;
  cardTitle.innerText = name;
  cardLike.addEventListener('click', likeCard); // слушатель лайка
  cardDelete.addEventListener('click', deleteCard); // слушатель корзины
  cardImage.addEventListener('click', openImage); // слушатель картинки

  return newCard;
}

// Добавляение карточки в DOM дерево 

function initCard(card) {
  const  newCard = createCard(card.name, card.link);
  elements.prepend(newCard);
}

// Добавление карточек из массива
initialCards.forEach(initCard);

// Обработчик лайка
function likeCard(evt) {
  const elementLikeBtn = evt.target;
  elementLikeBtn.classList.toggle('element__like_active');
}

// Обработчик удаления
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

// Обработчики открытия попапа
function openPopup(popup) {  
  popup.classList.add('popup_opened');
}

// Обработчик редактирования профиля
function openPopupEdit() {
  openPopup(popupEdit);
  // Задаем значения полям формы из полей
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
}

// Обработчик увеличения изображений
function openImage(evt) {
  const image = evt.target;
  document.querySelector('.popup__image').src = image.src;
  document.querySelector('.popup__image').alt = image.alt;
  document.querySelector('.popup__image-title').textContent = image.alt;
  openPopup(popupImg);
}

// Обработчики закрытия попапов без сохранения
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function closePopupAdd() {
  cardNameInput.value = ''; 
  linkImageInput.value = '';
  closePopup(popupAdd);
}

// Обработчики «отправки» форм
function formEditSubmitHandler (evt) {
  evt.preventDefault(); // Отменяем перезагрузку страницы после «отправки» формы
  // Задаем значения полям формы из полей
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // Закрываем попап
  closePopup(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault(); // Отменяем перезагрузку страницы после «отправки» формы
  // Создаем карточку из шаблона с картинкой и названием от пользователя
  const newCard = createCard();
  newCard.name = cardNameInput.value;
  newCard.alt = cardNameInput.value;
  newCard.link = linkImageInput.value;
  newCard.innerText = cardNameInput.value;
  initCard(newCard);
  // Закрываем и не забываем стереть данные из полей
  closePopupAdd();
}

// Следим за событиями открытия и закрытия попапов
btnEdit.addEventListener('click', openPopupEdit);
btnEditClose.addEventListener('click', () => closePopup(popupEdit));
btnAddCard.addEventListener('click', () => openPopup(popupAdd));
btnAddCardClose.addEventListener('click', closePopupAdd);
btnImgClose.addEventListener('click', () => closePopup(popupImg));

// Прикрепляем слушателей к формам:
// они будут следить за событием submit - «отправка»
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);