
/* Функция создания карточки + обработчик клика */
export function creatCard(name, link, alt, cardDel, butLike, imgEle) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const buttonDelete = cardElement.querySelector(".card__delete-button");
    const buttonLike = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
  
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__image").alt = alt;
     /* слушатели */
    buttonDelete.addEventListener("click", cardDel);
    buttonLike.addEventListener("click", butLike);
    cardImage.addEventListener("click", imgEle);
  
    return cardElement;
  }
  
  /* Функция лайка карточки */
  
  export function likeImage (evt) {
  evt.target.classList.toggle("card__like-button_is-active")
  }
  
  /* Функция открытия увеличенной картинки */
  export function openbigImg(evt) {
    const popup = document.querySelector(".popup_type_image")
    const popupImg = popup.querySelector(".popup__image")
    const popupText = popup.querySelector(".popup__caption")
    popupImg.src = evt.target.src;
    popupText.textContent = evt.target.alt;
  }
  
  /* Функция удаления карточки */
  export function deleteCard(event) {
    const deleteItem = event.target.closest(".card");
    deleteItem.remove();
  }
  

  