import "./pages/index.css"; /* для Webpack */

/* import { initialCards } from "./scripts/cards.js"; */
import { openModal, closeModal, closeModalOverlay } from "./scripts/modal.js";

import { createCard, handleLikeIconClick } from "./scripts/card.js";

import {
  editProf,
  addCardServer,
  profilUpdate,
  userPromise,
  cardsPromise,
} from "./scripts/Api.js";

import { setEventListeners, clearErrorValid } from "./scripts/validation.js";

/* Классы для валидации */
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inputErrormessage: ".form__input-error",
  classError: "form__input_type_error",
};

/* Глобальные переменные */
const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
/* для модальных окон */
const popupTipeEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonAvatar =
  document.querySelector(
    ".profile__image"
  ); /* для слушателя кнопки открытия попапа смены аватара */
const popapAvatar =
  document.querySelector(".popup_profil_edit"); /* div с формой смены аватара */
const popupTypeImage = document.querySelector(".popup_type_image");
const popup = document.querySelectorAll(".popup");
const popupNewCard = document.querySelector(".popup_type_new-card");
/* для форм */
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");
const formEdit = document.querySelector(".popup__form_edit");
const formENew = document.querySelector(".popup__form_new");
const formProfil = document.querySelector(".popup_profil_edit");
const profileImage = document.querySelector(".profile__image");
const popapFormProfil = document.querySelector(".popup__form_profil");
/* Для валидации */
const formElement = document.querySelector(".popup__form");
/* const formInput = formElement.querySelector(".popup__input_type_name"); */
const formElementNew =
  document.querySelector(
    ".popup__form_new"
  ); /* для дезактивации кнопки после добавления карточки */

/* Слушатель для открытия модального окна по кнопке редактирования профиля + отображение текущего статуса */
buttonEdit.addEventListener("click", function () {
  clearErrorValid(
    formEdit,
    validationConfig
  ); /* очищает валидацию при новом отктыие модального окна */
  formEdit.elements.name.value =
    nameInput.textContent; /* заполнение полей формы по умолчанию */
  formEdit.elements.description.value =
    jobInput.textContent; /* заполнение полей формы по умолчанию */
  openModal(popupTipeEdit);
});

/* Слушатель для открытия модального окна по кнопке добавление карточки */
buttonAdd.addEventListener("click", function () {
  clearErrorValid(
    formEdit,
    validationConfig
  ); /* очищает валидацию при новом отктыие модального окна */
  openModal(popupNewCard);
});

/* Слушатель для открытие модального окна редактирования аватара 30.06.2024 */
buttonAvatar.addEventListener("click", function () {
  clearErrorValid(formProfil, validationConfig);
  openModal(popapAvatar);
});

/* Функция (метод) для открытия модального окна по клику на изображение (открывается увеличеная картинка) */
function openBigImg(evt) {
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
  evt.addEventListener("click", closeModalOverlay);
});

/* КНОПКА СОХРАНИТЬ РЕДАКТИРОВАНИЯ ПРОФИЛЯ Слушатель для сохранения изм. модального окна редактирования профиля */
formEdit.addEventListener("submit", saveFormEdit);
/* КНОПКА СОХРАНИТЬ ДОБАВЛЕНИЯ КАРТОЧКИ Слушатель для изм. и добавления карточки */
formENew.addEventListener("submit", saveFormNew);
/* КНОПКА СОХРАНИТЬ попап изменения аватара */
popapFormProfil.addEventListener("submit", profilAvatarUpdate);

/* ----------------------ВАЛИДАЦИЯ---------------------- */
// Добавление обработчика ко всем формам

const enableValidation = (validationConfig) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));

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
      const objectCard = {
        nameCard: item.name,
        linkCard: item.link,
        altCard: item.alt,
        likesCard: item.likes,
        idCard: item._id,
        userId: userData._id,
        ownerId: item.owner._id,
      };
      const elementAdd = createCard(
        objectCard,
        handleLikeIconClick,
        openBigImg
      );
      placesList.append(elementAdd);
    });
  })
  /* В случае ошибки выводится окно об ошибке */
  .catch((err) => {
    console.log("Error fetching user and cards data: ", err);
  });

/* Функция для "лоадера" */
function editingTextButton(popupLoad, isLoad) {
  let textLoad = popupLoad.querySelector(".popup__button");
  console.log("1");
  if (isLoad) {
    textLoad.textContent = "Сохранение...";
    console.log("2");
  } else {
    textLoad.textContent = "Сохранить";
    console.log("3");
  }
}

/* Из файла form.js */

/* сохранение изменения в профиле */
function saveFormEdit(evt) {
  evt.preventDefault();
  editingTextButton(popupTipeEdit, true);
  editProf(formEdit.elements.name.value, formEdit.elements.description.value)
    .then(() => {
      nameInput.textContent = formEdit.elements.name.value;
      jobInput.textContent = formEdit.elements.description.value;
      closeModal(popupTipeEdit);
    })
    .catch((err) => {
      console.log(err);
    }) /* вызов ф-ции ред профиля с листа API */
    .finally(() => {
      editingTextButton(popupTipeEdit, false);
    });
}

/* Кнопка СОХРАНИТЬ, добавление новой карточки (в начало) */
function saveFormNew(evt) {
  evt.preventDefault();
  editingTextButton(popupNewCard, true);
  addCardServer(
    formENew.elements.place_name.value,
    formENew.elements.link.value
  )
    .then((item) => {
      const objectCard = {
        nameCard: item.name,
        linkCard: item.link,
        altCard: item.alt,
        likesCard: item.likes,
        idCard: item._id,
        userId: item.owner._id,
        ownerId: item.owner._id,
      };

      placesList.prepend(
        createCard(objectCard, handleLikeIconClick, openBigImg)
      );
      formENew.reset();
      formElementNew
        .querySelector(".popup__button")
        .classList.add(
          "popup__button_inactive"
        ); /* для дезактивации кнопки после добавления карточки */
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editingTextButton(popupNewCard, false);
    });
}

/* Функция для изменения информации о пользователе (также обноваляется на сервере) */
function profilAvatarUpdate(evt) {
  evt.preventDefault();
  editingTextButton(formProfil, true);
  profilUpdate(popapFormProfil.elements.avatar.value)
    .then(() => {
      profileImage.setAttribute(
        "style",
        `background-image: url("${popapFormProfil.elements.avatar.value}")`
      );
      closeModal(formProfil);
      popapFormProfil
        .querySelector(".popup__button")
        .classList.add(
          "popup__button_inactive"
        ); /* для дезактивации кнопки после добавления карточки */
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editingTextButton(formProfil, false);
    });
}
