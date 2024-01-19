let dayForm;
let dayTitle;
let dayText;
let saveDayBtn;
let newDayBtn;
let dayList;

if (window.location.pathname === "/notes") {
  dayForm = document.querySelector(".day-form");
  dayTitle = document.querySelector(".day-title");
  dayText = document.querySelector(".day-textarea");
  saveDayBtn = document.querySelector(".btn-save-day");
  newDayBtn = document.querySelector(".btn-new-day");
  clearBtn = document.querySelector(".btn-clear-day");
  dayList = document.querySelectorAll(".list-container .list-group");
}

const show = (elem) => {
  elem.style.display = "inline";
};

const hide = (elem) => {
  elem.style.display = "none";
};

let activeNote = {};

const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

const renderActiveNote = () => {
  hide(saveDayBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newDayBtn);
    dayTitle.setAttribute("readonly", true);
    dayText.setAttribute("readonly", true);
    dayTitle.value = activeNote.title;
    dayText.value = activeNote.text;
  } else {
    hide(newDayBtn);
    dayTitle.removeAttribute("readonly");
    dayText.removeAttribute("readonly");
    dayTitle.value = "";
    dayText.value = "";
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: dayTitle.value,
    text: dayText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  renderActiveNote();
};

const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

const handleRenderBtns = () => {
  show(clearBtn);
  if (!dayTitle.value.trim() && !dayText.value.trim()) {
    hide(clearBtn);
  } else if (!dayTitle.value.trim() || !dayText.value.trim()) {
    hide(saveDayBtn);
  } else {
    show(saveDayBtn);
  }
};

const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === "/notes") {
    dayList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add(
        "fa-solid",
        "fa-square-minus",
        "float-right",
        "text-danger",
        "delete-note"
      );
      delBtnEl.addEventListener("click", handleNoteDelete);
      liEl.append(delBtnEl);
    }
    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("How was today?", false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => dayList[0].append(note));
  }
};

const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
  saveDayBtn.addEventListener("click", handleNoteSave);
  newDayBtn.addEventListener("click", handleNewNoteView);
  clearBtn.addEventListener("click", renderActiveNote);
  dayForm.addEventListener("input", handleRenderBtns);
}

getAndRenderNotes();
