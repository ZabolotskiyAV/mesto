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
  cardImage.addEventListener('click', openImage); // слушатель картинки
  elements.appendChild(newCard);
}

// Добавляем карточки из массива
initialCards.forEach(initCards);

// Находим попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

// Находим кнопки
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditClose = document.querySelector('.popup__close-button');
const btnAddCardClose = document.querySelector('.addcard__close-button');
const btnAddCard = document.querySelector('.profile__add-button');
const btnDelete = document.querySelector('.element__delete');
const btnImgClose = document.querySelector('.img__close-button');

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
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

// Обработчик увеличения изображений
function openImage(evt) {
  //const image = evt.target.srcElement.baseURI;
  const image = evt.target;
  document.querySelector('.popup__image').src = image.src;
  document.querySelector('.popup__image').alt = image.alt;
  document.querySelector('.popup__image-title').textContent = image.alt;
  openPopupImg();
}

function openPopupImg() {  
  popupImg.classList.add('popup_opened');
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
function closePopupImg() {
  popupImg.classList.remove('popup_opened');
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
  cardLike.addEventListener('click', likeCard); // слушатель лайка
  cardDelete.addEventListener('click', deleteCard); // слушатель корзины
  cardImage.addEventListener('click', openImage); // слушатель картинки
  // Добавляем карточку в начало
  elements.prepend(newCard);
  // Закрываем и не забываем стереть данные из полей
  closePopupAdd();
}

// Слушатель клика по картинкам
document.querySelector('.element__image').addEventListener('click', openImage);

// Следим за событиями открытия и закрытия попапов
btnEdit.addEventListener('click', openPopupEdit);
btnEditClose.addEventListener('click', closePopupEdit);
btnAddCard.addEventListener('click', openPopupAdd);
btnAddCardClose.addEventListener('click', closePopupAdd);
btnImgClose.addEventListener('click', closePopupImg);

// Прикрепляем слушателей к формам:
// они будут следить за событием submit - «отправка»
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);