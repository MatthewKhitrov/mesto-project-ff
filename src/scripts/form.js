import { nameInput, 
    jobInput, 
    formEdit, 
    formENew, 
    popupTipeEdit, 
    placesList, 
    popupNewCard, 
    openBigImg, 
    formElementNew, 
    formProfil, 
    profileImage, 
    popapFormProfil,
    editingTextButton
} from "../index.js";
import {createCard, 
    deleteCard, 
    handleLikeIconClick} from "./card.js";
import { closeModal } from "./modal.js";
import {editProf, 
    addCardServer, 
    profilUpdate} from "./Api.js";


/* сохранение изменения в профиле */
export function saveFormEdit(evt) {
  evt.preventDefault();
  editingTextButton(popupTipeEdit, true);
  nameInput.textContent = formEdit.elements.name.value;
  jobInput.textContent = formEdit.elements.description.value;
  editProf(nameInput, jobInput) /* вызов ф-ции ред профиля с листа API */
  editingTextButton(popupTipeEdit, false);
  closeModal(popupTipeEdit);
  
}

/* Кнопка СОХРАНИТЬ, добавление новой карточки (в начало) */
export function saveFormNew (evt) {
    evt.preventDefault();
    editingTextButton(popupNewCard, true);
    placesList.prepend(
        createCard(
            formENew.elements.place_name.value,
            formENew.elements.link.value,
            formENew.elements.place_name.value,
            deleteCard,
            handleLikeIconClick,
            openBigImg,
            ""
        )
    );
    addCardServer(formENew.elements.place_name.value, formENew.elements.link.value)
    formENew.reset();
    editingTextButton(popupNewCard, false);
    closeModal(popupNewCard);
    formElementNew.querySelector(".popup__button").classList.add("popup__button_inactive"); /* для дезактивации кнопки после добавления карточки */
}

/* Функция для изменения информации о пользователе (также обноваляется на сервере) */
export function profilAvatarUpdate(evt) {
    evt.preventDefault();
    editingTextButton(formProfil, true);
    profilUpdate(popapFormProfil.elements.avatar.value);
    editingTextButton(formProfil, false);
    
    profileImage.setAttribute(
      "style",
      `background-image: url("${popapFormProfil.elements.avatar.value}")`
    );
    closeModal(formProfil);
    popapFormProfil
      .querySelector(".popup__button")
      .classList.add("popup__button_inactive");
  }

 