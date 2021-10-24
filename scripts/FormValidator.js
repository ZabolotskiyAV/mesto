export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(input) {
    input.classList.add(this._config.inputErrorClass);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  
  _hideInputError(input) {
    input.classList.remove(this._config.inputErrorClass);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {    
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.setAttribute('disabled', 'disabled');
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._toggleButtonState();  
  
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}