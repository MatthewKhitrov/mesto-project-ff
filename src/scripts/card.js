import {sendLike, 
  deleteLike} from "./Api.js"

/* Функция создания карточки + обработчик клика */
export function createCard(name, link, alt, deleteCard, likeCard, 
  openImg, like, cardIsMy, cardID, likeMe) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const buttonLike = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
    let counterLike = cardElement.querySelector(".counter_like"); /* лайк */

    counterLike.textContent = Array.from(like).length;

    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").alt = name;
     /* слушатели */
     if (cardIsMy) {
      buttonDelete.remove()}
      else {
    buttonDelete.addEventListener("click", deleteCard);
  }
        if (likeMe) {
          buttonLike.classList.toggle("card__like-button_is-active") /* добавляет класс лайка после обновления */
        }
    buttonLike.addEventListener("click", ()=> {
      likeCard(cardID, buttonLike, counterLike)
    });
    cardImage.addEventListener("click", openImg);

    return cardElement;
  }
  
  /* Функция лайка карточки */
  
/*   export function likeImage (evt) {
  evt.target.classList.toggle("card__like-button_is-active")
  } */

  
  /* Функция удаления карточки */
  export function deleteCard(event) {
    const deleteItem = event.target.closest(".card");
    deleteItem.remove();
  }
  /* Удаление дум элемента */
  export function deleteCardDom (evt) {
    evt.remove()
  }

  /* Функция добавления/удаления лайка на сервере, а также закрашивание/осветление кнопки */
export const handleLikeIconClick = (cardID, likeButton, counterLike) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
 
  if (!isLiked) {
    likeButton.classList.toggle("card__like-button_is-active");
    sendLike(cardID);
    counterLike.textContent = +counterLike.textContent + 1;
  } else {
    likeButton.classList.toggle("card__like-button_is-active");
    deleteLike(cardID);
    counterLike.textContent = +counterLike.textContent - 1;
  }
};