import { nameInput, jobInput, formEdit, formENew, popupTipeEdit, placesList, popupNewCard } from "../index.js";
import {creatCard, deleteCard, likeImage, openbigImg} from "./card.js";
import { closeModal } from "./modal.js";

/* сохранение изменения в профиле */
export function saveFormEdit(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.elements.name.value;
  jobInput.textContent = formEdit.elements.description.value;
  closeModal(popupTipeEdit);
}


/* добавление новой карточки (в начало) */
export function saveFormNew (evt) {
    evt.preventDefault();
    placesList.prepend(
        creatCard(
            formENew.elements.place_name.value,
            formENew.elements.link.value,
            formENew.elements.place_name.value,
            deleteCard,
            likeImage,
            openbigImg
        )
    );
    formENew.reset();
    closeModal(popupNewCard);
}