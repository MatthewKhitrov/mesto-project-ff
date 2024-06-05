/* открытие модального окна */
export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener(
    "keydown",
    closeModalEsc
  ); /* добавление слушателя на Escape */
}

/* закрытие модального окна */
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener(
    "keydown",
    closeModalEsc
  ); /* удаление слушателя на Escape */
}

/* закрытие модального окна через Overlay и крестик */
export function closeModalOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

/* закрытие через Escape */
function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

