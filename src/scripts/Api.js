const token = "21ddeeda-d368-451a-b841-3937ee219f74";

function check(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

/* Мой токен */
const request = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14/",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};
/* Получение информации с сервера о пользователе*/
export function userPromise() {
  return fetch(`${request.baseUrl}users/me`, {
    headers: request.headers,
  }).then((res) => check(res));
}
/* Функция для получения списка карточек */
export function cardsPromise() {
  return fetch(`${request.baseUrl}cards`, {
    headers: request.headers,
  }).then((res) => check(res));
}

/* Редактирование профиля */
export function editProf(nameInput, jobInput) {
   return fetch(`${request.baseUrl}users/me`, {
    method: "PATCH",
    headers: request.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  }).then((res) => check(res));
}

/* Добавление карточки на сервер после добавления на странице */
export function addCardServer(name_value, link_value) {
  return fetch(`${request.baseUrl}cards`, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify({
      name: name_value,
      link: link_value,
    }),
  }).then((res) => check(res));
}

/* Удаление карточки с сервера */
export function deleteCardServ(id) {
  return fetch(`${request.baseUrl}cards/${id}`, {
    method: "DELETE",
    headers: request.headers,
  }).then((res) => check(res));
}

/* Отправка инфы по лайку на сервер */
export function sendLike(id) {
  return fetch(`${request.baseUrl}cards/likes/${id}`, {
    method: "PUT",
    headers: request.headers,
  }).then((res) => check(res));
}

/* Удаление лайка с сервера */
export function deleteLike(id) {
  return fetch(`${request.baseUrl}cards/likes/${id}`, {
    method: "DELETE",
    headers: request.headers,
  }).then((res) => check(res));
}

/* Обновления аватарки пользователя */
export function profilUpdate(link) {
  return fetch(`${request.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: request.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => check(res));
}
