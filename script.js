const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formReadYes = document.querySelector("#choice-yes");
const formReadNo = document.querySelector("#choice-no");
const formSubmit = document.querySelector(".form-submit");

formSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const formRead = document.querySelector('input[name="choice"]:checked');
  const read = formRead ? formRead.value === "yes" : false;

  addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, read);

  clear();
  clearForm();
  displayBook();
  dialog.close();
});

const booksContainer = document.querySelector(".books-container");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".open-dialog");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

function clear() {
  booksContainer.innerHTML = "";
}

function clearForm() {
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formReadYes.checked = false;
  formReadNo.checked = false;
}

function displayBook() {
  myLibrary.forEach((book) => {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    const bookTitle = document.createElement("h1");
    const bookAuthor = document.createElement("h2");
    const bookPages = document.createElement("h3");
    const bookRead = document.createElement("h4");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    if (book.read === true) {
      bookRead.textContent = "Have Read";
    } else {
      bookRead.textContent = "Have not Read";
    }

    const removeBook = document.createElement("button");
    removeBook.classList.add("remove-button");
    removeBook.textContent = "Remove";
    removeBook.addEventListener("click", () => {
      const toRemove = book.id;

      const index = myLibrary.findIndex((book) => book.id === toRemove);
      myLibrary.splice(index, 1);
      clear();
      displayBook();
    });

    bookContainer.appendChild(removeBook);

    booksContainer.appendChild(bookContainer);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookRead);

    bookRead.addEventListener("click", () => {
      book.toggleRead();
      clear();
      displayBook();
    });
  });
}
