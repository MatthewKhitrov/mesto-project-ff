(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function o(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&n(e.currentTarget)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}e.d({},{sd:()=>P,I9:()=>k,tf:()=>L,H9:()=>x,x4:()=>E,i0:()=>q,K3:()=>S,_q:()=>A,dm:()=>p,Lf:()=>j,Dg:()=>g,bR:()=>_,ZH:()=>C});var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-14/",headers:{authorization:"21ddeeda-d368-451a-b841-3937ee219f74","Content-Type":"application/json"}};function a(e,t,n,o,r,c,a,u,i,l){var s=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__delete-button"),p=s.querySelector(".card__like-button"),_=s.querySelector(".card__image"),f=s.querySelector(".counter_like");return f.textContent=Array.from(a).length,s.querySelector(".card__image").src=t,s.querySelector(".card__title").textContent=e,s.querySelector(".card__image").alt=n,u?d.remove():d.addEventListener("click",o),l&&p.classList.toggle("card__like-button_is-active"),p.addEventListener("click",(function(){r(i,p,f)})),_.addEventListener("click",c),s}function u(e){e.target.closest(".card").remove()}var i=function(e,t,n){var o;t.classList.contains("card__like-button_is-active")?(t.classList.toggle("card__like-button_is-active"),function(e){fetch("".concat(c.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return e.pk?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(e),n.textContent=+n.textContent-1):(t.classList.toggle("card__like-button_is-active"),o=e,fetch("".concat(c.baseUrl,"cards/likes/").concat(o),{method:"PUT",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),n.textContent=+n.textContent+1)};function l(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button_inactive")):(t.disabled=!0,t.classList.add("popup__button_inactive"))}function s(e){Array.from(document.querySelectorAll(".form__input-error")).forEach((function(e){e.textContent="",e.classList.remove("form__input_type_error")})),Array.from(document.querySelectorAll(".popup__input")).forEach((function(e){e.classList.remove("form__input_type_error")}))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var p=document.querySelector(".content").querySelector(".places__list"),_=(document.querySelector("#card-template").content,document.querySelector(".popup_type_edit")),f=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),y=document.querySelector(".profile__image"),v=document.querySelector(".popup_profil_edit"),h=(document.querySelector(".card__image"),document.querySelector(".popup_type_image")),b=document.querySelectorAll(".popup"),g=document.querySelector(".popup_type_new-card"),S=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),L=document.querySelector(".popup__form_edit"),k=document.querySelector(".popup__form_new"),E=document.querySelector(".popup_profil_edit"),C=document.querySelector(".profile__image"),j=document.querySelector(".popup__form_profil"),x=(document.querySelector(".popup__form").querySelector(".popup__input_type_name"),document.querySelector(".popup__form_new"));function A(e){var n=h.querySelector(".popup__image"),o=h.querySelector(".popup__caption");t(h),n.src=e.target.src,o.textContent=e.target.alt,n.textContent=e.target.alt}function P(e,t){var n=e.querySelector(".popup__button");console.log("1"),t?(n.textContent="Сохранение...",console.log("2")):(n.textContent="Сохранить",console.log("3"))}f.addEventListener("click",(function(){s(),L.elements.name.value=S.textContent,L.elements.description.value=q.textContent,t(_)})),m.addEventListener("click",(function(){s(),t(g)})),y.addEventListener("click",(function(){s(),t(v)})),b.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",o)})),L.addEventListener("submit",(function(e){e.preventDefault(),P(_,!0),S.textContent=L.elements.name.value,q.textContent=L.elements.description.value,function(e,t){fetch("".concat(c.baseUrl,"users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e.textContent,about:t.textContent})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(S,q),P(_,!1),n(_)})),k.addEventListener("submit",(function(e){var t,o;e.preventDefault(),P(g,!0),p.prepend(a(k.elements.place_name.value,k.elements.link.value,k.elements.place_name.value,u,i,A,"")),t=k.elements.place_name.value,o=k.elements.link.value,fetch("".concat(c.baseUrl,"cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:t,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),k.reset(),P(g,!1),n(g),x.querySelector(".popup__button").classList.add("popup__button_inactive")})),j.addEventListener("submit",(function(e){var t;e.preventDefault(),P(E,!0),t=j.elements.avatar.value,fetch("".concat(c.baseUrl,"users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?(console.log(e),e.json()):Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),P(E,!1),C.setAttribute("style",'background-image: url("'.concat(j.elements.avatar.value,'")')),n(E),j.querySelector(".popup__button").classList.add("popup__button_inactive")})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");l(t,n),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("form__input_type_error"),n.classList.remove("form__input-error_active"),n.textContent=""}(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("form__input_type_error"),o.textContent=n,o.classList.add("form__input-error_active")}(e,t,t.validationMessage)}(e,o),l(t,n)}))}))}(e)})),Promise.all([fetch("".concat(c.baseUrl,"users/me"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),fetch("".concat(c.baseUrl,"cards"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],u=o[1];S.textContent=r.name,q.textContent=r.about,C.setAttribute("style","background-image: url('".concat(r.avatar,"')")),u.forEach((function(e){var t=r._id!==e.owner._id;console.log(t);var n=r._id===function(e,t){var n;return e.some((function(e){if(e._id===t)return n=t;n=e._id})),n}(e.likes,r._id),o=a(e.name,e.link,e.alt,(function(){var t;(t=e._id,fetch("".concat(c.baseUrl,"cards/").concat(t),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(){console.log(),o.remove()}))}),i,A,e.likes,t,e._id,n);p.append(o)}))})).catch((function(e){console.log("Error fetching user and cards data: ",e)}))})();