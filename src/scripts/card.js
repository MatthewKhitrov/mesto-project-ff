import { sendLike, deleteLike, deleteCardServ } from "./Api.js";

/* Функция создания карточки + обработчик клика */
export function createCard(objectCard, likeCard, openImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  let counterLike = cardElement.querySelector(".counter_like"); /* лайк */

  counterLike.textContent = Array.from(objectCard.likesCard).length;

  const cardIsMy = objectCard.userId !== objectCard.ownerId;
  const cardMeLike =
    objectCard.userId === likeMeCard(objectCard.likesCard, objectCard.userId);

  cardElement.querySelector(".card__image").src = objectCard.linkCard;
  cardElement.querySelector(".card__title").textContent = objectCard.nameCard;
  cardElement.querySelector(".card__image").alt = objectCard.nameCard;

  /* слушатели */
  if (cardIsMy) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", () => {
      deleteCardServAndHtml(objectCard.idCard, cardElement);
    });
  }
  if (cardMeLike) {
    buttonLike.classList.toggle(
      "card__like-button_is-active"
    ); /* добавляет класс лайка после обновления */
  }
  buttonLike.addEventListener("click", () => {
    likeCard(objectCard.idCard, buttonLike, counterLike);
  });
  cardImage.addEventListener("click", openImg);

  return cardElement;
}

/* Удаление дум элемента */
export function deleteCardDom(evt) {
  evt.remove();
}

/* Функция добавления/удаления лайка на сервере, а также закрашивание/осветление кнопки */
export const handleLikeIconClick = (cardId, likeButton, counterLike) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (!isLiked) {
    sendLike(cardId)
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
        counterLike.textContent = +counterLike.textContent + 1;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(cardId)
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
        counterLike.textContent = +counterLike.textContent - 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

/* Функция для подгрузки лайкнутых мною карточек */
function likeMeCard(items, userId) {
  let cardMeLike;

  const itemsArray = Array.from(items);

  itemsArray.some((likeId) => {
    if (likeId._id === userId) {
      return (cardMeLike = userId);
    } else {
      cardMeLike = likeId._id;
    }
  });
  return cardMeLike;
}

/* Удаление карточки с html разметки и сервера */
export function deleteCardServAndHtml(cardId, card) {
  deleteCardServ(cardId)
    .then(() => {
      deleteCardDom(card);
    })
    .catch((err) => {
      console.log(err);
    });
}
