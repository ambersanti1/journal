"use strict";

const formLogin = document.getElementById("saveLogin");
const mensajeError = document.getElementsByClassName("error")[0];

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  let email = document.getElementById("emailLogin").value;
  let password = document.getElementById("passwordLogin").value;
  let login = { email: email, password: password };
  let loginJson = JSON.stringify(login);
  console.log(loginJson);
  const res = await fetch(
    "https://journal-project-b13e2781a0cd.herokuapp.com/api/auth/login",
    {
      method: "POST",
      body: loginJson,
    }
  );
  if (!res.ok) return mensajeError.classList.toggle("escondido", false);
  const resJson = await res.json();
  if (resJson.redirect) {
    window.location.href = resJson.redirect;
  }
});
