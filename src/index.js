import {initialCards} from './scripts/cards.js'
import {openModal, 
  closeModal, 
  closeModalOverlay, 
  /* openModalImage */} from './scripts/modal.js'
import {saveFormEdit, 
  saveFormNew, 
  profilAvatarUpdate} from './scripts/form.js'
import { createCard, 
  deleteCard, 
  deleteCardDom, 
  handleLikeIconClick/* , openBigImg  */} from "./scripts/card.js";
/* import './pages/index.css'; */ /* для Webpack */

import {userPromise, 
  cardsPromise, 
  deleteCardServ} from "./scripts/Api.js";

import {/* showInputError,
  hideInputError,
  isValid, */
  setEventListeners,
  clearErrorValid,
 } from "./scripts/validation.js";

export const validationConfig = { 
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inputErrormessage: ".form__input-error",
  classError: "form__input_type_error"
};


/* Глобальные переменные */
const container = document.querySelector(".content");
export const placesList = container.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;
/* для модальных окон */
export const popupTipeEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonAvatar = document.querySelector(".profile__image") /* для слушателя кнопки открытия попапа смены аватара */
const popapAvatar = document.querySelector(".popup_profil_edit") /* div с формой смены аватара */
const clickImage = document.querySelector(".card__image");
export const popupTypeImage = document.querySelector(".popup_type_image");
const popup = document.querySelectorAll(".popup");
export const popupNewCard = document.querySelector(".popup_type_new-card");

/* для форм */
export const nameInput = document.querySelector(".profile__title");
export const jobInput = document.querySelector(".profile__description");
export const formEdit = document.querySelector(".popup__form_edit");
export const formENew = document.querySelector(".popup__form_new");
export const formProfil = document.querySelector(".popup_profil_edit")
export const profileImage = document.querySelector(".profile__image")
export const popapFormProfil = document.querySelector(".popup__form_profil")


/* Для валидации */
export const formElement = document.querySelector('.popup__form');
export const formInput = formElement.querySelector('.popup__input_type_name');
export const formElementNew = document.querySelector('.popup__form_new'); /* для дезактивации кнопки после добавления карточки */


/* Слушатель для открытия модального окна по кнопке редактирования профиля + отображение текущего статуса */

buttonEdit.addEventListener("click", function () {
  clearErrorValid (formEdit, validationConfig) /* очищает валидацию при новом отктыие модального окна */
  formEdit.elements.name.value = nameInput.textContent; /* заполнение полей формы по умолчанию */
  formEdit.elements.description.value = jobInput.textContent; /* заполнение полей формы по умолчанию */
  openModal (popupTipeEdit)
})

/* Слушатель для открытия модального окна по кнопке добавление карточки */

buttonAdd.addEventListener("click", function () {
  clearErrorValid (formEdit, validationConfig) /* очищает валидацию при новом отктыие модального окна */
  openModal (popupNewCard)
})

/* Слушатель для открытие модального окна редактирования аватара 30.06.2024 */
buttonAvatar.addEventListener("click", function () {
  clearErrorValid (formProfil, validationConfig)
   openModal (popapAvatar)
})


/* Функция (метод) для открытия модального окна по клику на изображение (открывается увеличеная картинка) */
export function openBigImg(evt) {
    const popupImg = popupTypeImage.querySelector(".popup__image");
  const popupText = popupTypeImage.querySelector(".popup__caption");
  openModal(popupTypeImage);
  popupImg.src = evt.target.src;
  popupText.textContent = evt.target.alt;
  popupImg.textContent = evt.target.alt;
}

/* Закрытие модальных оконо по OverLay || по крестику*/

popup.forEach((evt) => {
  evt.classList.add("popup_is-animated");
  evt.addEventListener("click", closeModalOverlay)
})

/* КНОПКА СОХРАНИТЬ РЕДАКТИРОВАНИЯ ПРОФИЛЯ Слушатель для сохранения изм. модального окна редактирования профиля */
formEdit.addEventListener("submit", saveFormEdit);
/* КНОПКА СОХРАНИТЬ ДОБАВЛЕНИЯ КАРТОЧКИ Слушатель для изм. и добавления карточки */
formENew.addEventListener("submit", saveFormNew);
/* КНОПКА СОХРАНИТЬ попап изменения аватара */
popapFormProfil.addEventListener("submit", profilAvatarUpdate)

/* ----------------------ВАЛИДАЦИЯ---------------------- */
// Добавление обработчика ко всем формам

const enableValidation = (validationConfig) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig); 

  /* API */

  /* Подключение к серверу */
/* Выполнение обещаний после прогрузки необходимой информации с APi. Загрузка на страницу информацию обо мне и погрузка карточек с сервера */
Promise.all([userPromise(), cardsPromise()])
.then(([userData, cardData]) => {
  /* Отображение моего имени и моей работы */
  nameInput.textContent = userData.name;
  jobInput.textContent = userData.about;
  profileImage.setAttribute(
    "style",
    `background-image: url('${userData.avatar}')`
  );

  /* Выгрузка всех карточек с сервера */
  cardData.forEach((item) => {
    const cardIsMy = userData._id !== item.owner._id;
    console.log(cardIsMy)
    const cardMeLike = userData._id === likeMeCard(item.likes, userData._id);
    const elementAdd = createCard(
      item.name,
      item.link,
      item.alt,
      () => {
      deleteCardServ(item._id).then(()=>{
        console.log()
        deleteCardDom(elementAdd)
      }) 
     },
     handleLikeIconClick, 
      openBigImg,
      item.likes,
      cardIsMy,
      item._id,
      cardMeLike
    );
    placesList.append(elementAdd);
  });
})
/* В случае ошибки выводится окно об ошибке */
.catch((err) => {
  console.log("Error fetching user and cards data: ", err);
});


/* Функция для подгрузки лайкнутых мною карточек */
export function likeMeCard(items, userId) {
  let cardMeLike;
  items.some((likeId) => {
    if (likeId._id === userId) {
      return (cardMeLike = userId);
    } else {
      cardMeLike = likeId._id;
    }
  });
  return cardMeLike;
}


/* Функция для "лоадера" */
export function editingTextButton (popupLoad, isLoad) {
  let textLoad = popupLoad.querySelector(".popup__button");
  console.log("1")
  if (isLoad) {
    textLoad.textContent = "Сохранение...";
    console.log("2")
  } else {
    textLoad.textContent = "Сохранить";
    console.log("3")
  }
}