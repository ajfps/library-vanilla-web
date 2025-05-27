const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
}

const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formReadStatus = document.querySelector("#choice");
const formSubmit = document.querySelector(".form-submit")

formSubmit.addEventListener("click", addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formReadStatus.value))

const booksContainer = document.querySelector(".books-container")




