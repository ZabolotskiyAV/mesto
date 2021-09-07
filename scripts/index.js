// Первоначальный массив
const initialCards = [
  {
    name: 'Айгир',
    link: '../images/aigir.jpg'
  },
  {
    name: 'Водопад Атыш',
    link: '../images/atish.jpg'
  },
  {
    name: 'Голубое озеро',
    link: '../images/goluboe-ozero.jpg'
  },
  {
    name: 'Иремель',
    link: '../images/iremel.jpg'
  },
  {
    name: 'Красный ключ',
    link: '../images/krasniy-klych.jpg'
  },
  {
    name: 'Шиханы',
    link: '../images/shikhani.jpg'
  }
];

const template = document.getElementById('cards');

const elements = document.querySelector('.elements');

// Обработчик создания карточки из массива
function initCards(card) {
  const newCard = template.content.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const cardLike = newCard.querySelector('.element__like');
  const cardDelete = newCard.querySelector('.element__delete');
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardTitle.innerText = card.name;
  cardLike.addEventListener('click', likeCard); // слушатель лайка
  cardDelete.addEventListener('click', deleteCard); // слушатель корзины
  elements.appendChild(newCard);
}

// Добавляем карточки из массива
initialCards.forEach(initCards);

// Находим попапы
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');

// Находим кнопки
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditClose = document.querySelector('.popup__close-button');
const btnAddCardClose = document.querySelector('.addcard__close-button');
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

// Обработчик лайка
function likeCard(evt) {
  const elementLikeBtn = evt.target;
  elementLikeBtn.classList.toggle('element__like_active');
}

// Обработчик удаления
function deleteCard() {
  const elementDelete = btnDelete.closest('.element');
  elementDelete.remove;
}

// Обработчики открытий попапов
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  // Задаем значения полям формы из полей
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
}
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

// Обработчики закрытия попапов без сохранения
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}
function closePopupAdd() {
  cardNameInput.value = ''; 
  linkImageInput.value = '';
  popupAdd.classList.remove('popup_opened');
}

// Обработчики «отправки» форм
function formEditSubmitHandler (evt) {
  // Отменяем перезагрузку страницы после «отправки» формы
  evt.preventDefault(); 
  // Задаем значения полям формы из полей
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // Закрываем попап
  closePopupEdit();
}

function formAddSubmitHandler (evt) {
  // Отменяем перезагрузку страницы после «отправки» формы
  evt.preventDefault();
  // Создаем карточку из шаблона с картинкой и названием от пользователя
  const newCard = template.content.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const cardLike = newCard.querySelector('.element__like');
  const cardDelete = newCard.querySelector('.element__delete');
  cardImage.alt = cardNameInput.value;
  cardImage.src = linkImageInput.value;
  cardTitle.innerText = cardNameInput.value;
  cardLike.addEventListener('click', likeBtn); // слушатель лайка
  cardDelete.addEventListener('click', deleteBtn); // слушатель корзины
  // Добавляем карточку в начало
  elements.prepend(newCard);
  // Закрываем и не забываем стереть данные
  closePopupAdd();
}

// Следим за событиями открытия и закрытия попапа
btnEdit.addEventListener('click', openPopupEdit);
btnEditClose.addEventListener('click', closePopupEdit);
btnAddCard.addEventListener('click', openPopupAdd);
btnAddCardClose.addEventListener('click', closePopupAdd);

// Прикрепляем обработчики к формам:
// он будет следить за событием submit - «отправка»
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);

// Обработчик лайка
