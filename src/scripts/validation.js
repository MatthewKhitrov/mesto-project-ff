// Функция, которая добавляет класс с ошибкой
export const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass); 
    /* inputElement.classList.add('form__input_type_error'); */
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    /* errorElement.classList.add('form__input-error_active'); */
  };

// Функция, которая удаляет класс с ошибкой
export function hideInputError (formElement, inputElement, validationConfig)  {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    /* inputElement.classList.remove('form__input_type_error'); */
    errorElement.classList.remove(validationConfig.errorClass);
    /* errorElement.classList.remove('form__input-error_active'); */
    errorElement.textContent = '';
  };
  
  // Функция, которая проверяет валидность поля
export const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку 
      // и заменяет ею стандартное сообщение об ошибке
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
  inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      // hideInputError теперь получает параметром форму, в которой  находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, validationConfig);
    }
  }; 

  // Добавление слушателя ко всем полям формы

export const setEventListeners = (formElement, validationConfig) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    /* const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  */              
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);  
    /* const buttonElement = formElement.querySelector('.popup__button');  */    
    toggleButtonState(inputList, buttonElement, validationConfig); /* Делает кнопку не активной при открытие модального окна */
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, validationConfig)
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  }; 



  // Функция блокирования кнопки формы

function toggleButtonState (inputList, buttonElement, validationConfig) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
          buttonElement.classList.add(validationConfig.inactiveButtonClass); 
      /* buttonElement.classList.add('popup__button_inactive'); */
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
          buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      /* buttonElement.classList.remove('popup__button_inactive'); */
    }
  }; 

  // Функция проверки валидности, определяет состояние кнопки

function hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }; 

  /* Функция очистки поля валидации */

  export function clearErrorValid (formEdit, validationConfig) {
    const spanErrors = Array.from(document.querySelectorAll(validationConfig.inputErrormessage));
   /*  const spanErrors = Array.from(document.querySelectorAll(".form__input-error")); */
      spanErrors.forEach((spanError) => {
      spanError.textContent = "";
      spanError.classList.remove(validationConfig.classError); /* убирает надпись */
      /* spanError.classList.remove("form__input_type_error"); */
    })
    const inputErorr = Array.from(document.querySelectorAll(validationConfig.inputSelector));
    /* const inputErorr = Array.from(document.querySelectorAll(".popup__input")); */
    inputErorr.forEach((inputErorr) => {
     inputErorr.classList.remove(validationConfig.classError) /* убирает черточку */
     /* inputErorr.classList.remove("form__input_type_error") */
    })
  }