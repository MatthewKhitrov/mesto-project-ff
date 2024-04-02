
/* Функция создания карточки + обработчик клика */
export function creatCard(name, link, alt, deleteCard, likeCard, openImg) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const buttonLike = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
  
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").alt = alt;
     /* слушатели */
    buttonDelete.addEventListener("click", deleteCard);
    buttonLike.addEventListener("click", likeCard);
    cardImage.addEventListener("click", openImg);
  
    return cardElement;
  }
  
  /* Функция лайка карточки */
  
  export function likeImage (evt) {
  evt.target.classList.toggle("card__like-button_is-active")
  }

  
  /* Функция удаления карточки */
  export function deleteCard(event) {
    const deleteItem = event.target.closest(".card");
    deleteItem.remove();
  }
  
