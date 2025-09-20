"use strict";

const beginDigit = /^\D.*$/;
const withoutSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const containsLetters = /^.*[a-zA-Z]+.*$/;
const containsCyrillicLetters = /^.*[а-яА-Я]+.*$/;
let valid = true;

function validateForm() {
  const pw1 = document.getElementById("password");
  const pw2 = document.getElementById("confirm-password");
  const name1 = document.getElementById("firstName");
  const name2 = document.getElementById("lastName");
  if (/\d/.test(name1.value)) {
    document.getElementById("error-message-first-name").innerHTML = "**Лише символи";
    valid = false;
    return valid;
  } else {
    valid = true;
    document.getElementById("error-message-first-name").innerHTML = "";
  }

  if (/\d/.test(name2.value)) {
    document.getElementById("error-message-last-name").innerHTML = "**Лише символи";
    valid = false;
    return valid;
  } else {
    valid = true;
    document.getElementById("error-message-last-name").innerHTML = "";
  }

  if(!containsLetters.test(pw1.value)) {
      document.getElementById("error-message-password").innerHTML = "**Пароль має містити літери";
      valid = false;
      return valid;
  } else if (withoutSpecialChars.test(pw1.value)) {
      document.getElementById("error-message-password").innerHTML = "**Пароль не має містити 'спеціальних символів'";
      valid = false;
      return valid;
  } else if (!beginDigit.test(pw1.value)) {
      document.getElementById("error-message-password").innerHTML = "**Пароль не повинен містити числа на початку";
      valid = false;
      return valid;
  } else if(containsCyrillicLetters.test(pw1.value)) {
      document.getElementById("error-message-password").innerHTML = "**Пароль не повинен містити кирилицю";
      valid = false;
      return valid;
  } else {
      valid = true;
      document.getElementById("error-message-password").innerHTML = "";
  }


  if (pw1.value != pw2.value) {
    document.getElementById("error-message-confirm-password").innerHTML = "**Паролі не схожі між собою";
    valid = false;
    return valid;
  }

  valid = true;
}

const registerForm = document.querySelectorAll("form");
const inputs = document.querySelectorAll("input");

registerForm.forEach(element => {
  element.addEventListener("submit", (e) => {
    //e.preventDefault();

    if(valid) {
      openModal(modal);
    }
  });
});