// Находим попап
let popup = document.querySelector('.popup');

// Находим кнопки
let btnEdit = document.querySelector('.profile__edit-button');
let btnClose = document.querySelector('.popup__close-button');

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

// Находим поля формы в DOM
let nameInput = document.getElementById('inputProfileName');
let jobInput = document.getElementById('inputProfileDescription');

// Находим поля для формы в DOM
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// Обработчик открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  // Задаем значения полям формы из полей
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
}

// Обработчик закрытия попапа без сохранения
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // отменяем перезагрузку страницы после «отправки» формы

  // Задаем значения полям формы из полей
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

// Следим за событиями открытия и закрытия попапа
btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);