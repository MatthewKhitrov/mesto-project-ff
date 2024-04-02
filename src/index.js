import {initialCards} from './scripts/cards.js'
import {openModal, closeModal, closeModalOverlay, openModalImage} from './scripts/modal.js'
import {saveFormEdit, saveFormNew} from './scripts/form.js'
import { creatCard, deleteCard, likeImage/* , openBigImg  */} from "./scripts/card.js";
import './pages/index.css'; /* для Webpack */

/* Глобальные переменные */
const container = document.querySelector(".content");
export const placesList = container.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;
/* для модальных окон */
export const popupTipeEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const clickImage = document.querySelector(".card__image");
export const popupTypeImage = document.querySelector(".popup_type_image");
const popup = document.querySelectorAll(".popup");
export const popupNewCard = document.querySelector(".popup_type_new-card");
/* для форм */
export const nameInput = document.querySelector(".profile__title");
export const jobInput = document.querySelector(".profile__description");
export const formEdit = document.querySelector(".popup__form_edit");
export const formENew = document.querySelector(".popup__form_new");


  /* Функция добавления карточки  */
  initialCards.forEach((item) => {
    const elementAdd = creatCard(item.name, item.link, item.alt, deleteCard, likeImage, openBigImg);
    placesList.append(elementAdd);
  });


/* Слушатель для открытия модального окна по кнопке редактирования профиля + отображение текущего статуса */
buttonEdit.addEventListener("click", function () {
  formEdit.elements.name.value = nameInput.textContent; /* заполнение полей формы по умолчанию */
  formEdit.elements.description.value = jobInput.textContent; /* заполнение полей формы по умолчанию */
  openModal (popupTipeEdit)
})

/* Слушатель для открытия модального окна по кнопке добавление карточки */
buttonAdd.addEventListener("click", function () {
  openModal (popupNewCard)
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

/* Слушатель для сохранения изм. модального окна редактирования профиля */
formEdit.addEventListener("submit", saveFormEdit);
/* Слушатель для изм. и добавления карточки */
formENew.addEventListener("submit", saveFormNew);

