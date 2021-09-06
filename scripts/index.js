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

function initCards (card) {
  const newCard = template.content.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardTitle.innerText = card.name;

  elements.appendChild(newCard);
}

initialCards.forEach(initCards);



// Находим попапы
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');

// Находим кнопки
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditClose = document.querySelector('.popup__close-button');
const btnAddCardClose = document.querySelector('.addcard__close-button');
const btnAddCard = document.querySelector('.profile__add-button');

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
  evt.preventDefault(); // отменяем перезагрузку страницы после «отправки» формы

  // Задаем значения полям формы из полей
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopupEdit();
}

function formAddSubmitHandler (evt) {
  evt.preventDefault(); // отменяем перезагрузку страницы после «отправки» формы
  
  // Добавляем карточку

  // Закрываем удалением класса, без вызова функции, чтобы не стереть данные

  popupAdd.classList.remove('popup_opened');
}

// Следим за событиями открытия и закрытия попапа
btnEdit.addEventListener('click', openPopupEdit);
btnEditClose.addEventListener('click', closePopupEdit);
btnAddCardClose.addEventListener('click', closePopupAdd);
btnAddCard.addEventListener('click', openPopupAdd);

// Прикрепляем обработчики к формам:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);