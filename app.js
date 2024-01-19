const env = require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const notesList = require("./db/db.json");
const { validatorRegister, validatorLogin } = require("./validators/auth");
const { loginCtrl, registerCtrl } = require("./controllers/auth");
const { dbConnectMysql } = require("./config/connection");

//Configuración
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json({ type: "*/*" }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/controllers"));

app.use(require("./controllers/articles"));
app.use(express.static(path.join(__dirname, "./public/images")));
//Rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/login.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/todolist.html"));
});
app.post("/api/auth/register", validatorRegister, registerCtrl);
app.post("/api/auth/login", validatorLogin, loginCtrl);

//GET to consult notes
app.get("/api/notes", (req, res) => {
  res.json(notesList.slice(1)); // Slice cuts the first element of the list which is an undefined value
});

function saveNewNote(body, notesList) {
  if (!Array.isArray(notesList)) notesList = []; //

  if (notesList.length === 0) notesList.push(0);
  body.id = notesList[0];
  notesList[0]++;

  notesList.push(body);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesList, null, 1) //(obj, replacer, spacer (in db.json))
  );
  return body;
}

app.post("/api/notes", (req, res) => {
  const savedNote = saveNewNote(req.body, notesList);
  res.json(savedNote);
});

function deleteNote(id, notesList) {
  for (let i = 0; i < notesList.length; i++) {
    let note = notesList[i];

    if (note.id == id) {
      notesList.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesList, null, 1)
      );

      break;
    }
  }
}

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, notesList);
  res.json(true);
});

//Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Tu app está lista por http://localhost:4040");
});

dbConnectMysql();
