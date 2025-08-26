// Select elements
const modal = document.querySelector("#modalBack");
const addBtn = document.querySelector("#addBooksBtn");
const body = document.body;
const closeBtn = document.querySelector("#close-btn");
const form = document.getElementById('modal-form');

// Global arrays/variables
let library = [];
let editingBookId = null;

// Event Listeners

window.addEventListener("load", fillShelves);
window.addEventListener("resize", fillShelves);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const readPages = formData.get("pagesRead");
    const completed = formData.get("completed") ? true : false;
    const notes = formData.get("notes");
    const rating = formData.get("stars");

    if (editingBookId) {
        const book = library.find(b => b.id === editingBookId);

        book.title = title;
        book.author = author;
        book.pages = pages;
        book.readPages = readPages;
        book.completed = completed;
        book.notes = notes;
        book.rating = rating;

        document.getElementById(editingBookId).textContent = title; // update DOM

        editingBookId = null;
    } else {
        addBookToLibrary();
    }


    form.reset();

    modal.classList.remove("show");
    body.style.overflow = "visible";
})

addBtn.addEventListener("click", () => {
    const title = document.querySelector("#modal-title");

    modal.classList.add("show");
    body.style.overflow = "hidden";

    title.textContent = "Add Book";
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    body.style.overflow = "visible";
})

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
        body.style.overflow = "visible";
    }
});

// Book Constructor

function Book (id, title, author, pages, readPages, completed, notes, rating) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readPages = readPages;
    this.completed = completed;
    this.notes = notes;
    this.rating = rating;
}

function addBookToLibrary () {
    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const readPages = formData.get("pagesRead");
    const completed = formData.get("completed") ? true : false;
    const notes = formData.get("notes")
    const rating = formData.get("stars");
    let id = crypto.randomUUID();

    library.push(new Book(id, title, author, pages, readPages, completed, notes, rating));

    books = document.getElementsByClassName("book");

    displayBook(title, id, author, pages, readPages, completed, notes, rating);
}

function displayBook (bookTitle, id, author, pages, readPages, completed, notes, rating) {
    const grid = document.getElementById("gridContainer");
    const items = grid.querySelectorAll(".shelf-item");
    const colours = [
        "#D96F32",
        "#D93232",
        "#326FD9",
        "#32D96F",
        "#D9327C",
        "#7C32D9"
    ];

    const book = document.createElement("div");
    book.classList.add("book");
    book.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
    book.textContent = bookTitle;
    book.id = id;

    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("empty")) {
            items[i].classList.remove("empty");
            items[i].appendChild(book);

            addBookEventListener(book);

            return;
        }
    }

    const spot = document.createElement("div");
    spot.classList.add("shelf-item");
    grid.appendChild(spot);
    spot.appendChild(book);
        
    fillShelves();

    addBookEventListener(book);
}

function updatBookModalData (bookData) {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const pagesReadInput = document.getElementById("pagesRead");
    const notesInput = document.getElementById("notes");
    const ratingInputs = document.querySelectorAll("input[name='stars']");
    const completedInput = document.getElementById("completed");

    document.getElementById("modal-title").textContent = "Edit Book";

    titleInput.value = bookData.title;
    authorInput.value = bookData.author;
    pagesInput.value = bookData.pages;
    pagesReadInput.value = bookData.readPages;
    notesInput.value = bookData.notes;
    completedInput.checked = bookData.completed;

    ratingInputs.forEach(input => {
        input.checked = (input.value === bookData.rating);
    });
}

function addBookEventListener (book) {
    book.addEventListener("click", () => {
        modal.classList.add("show");
        body.style.overflow = "hidden";

        editingBookId = book.id;

        const bookData = library.find(b => b.id === book.id);
        book.textContent = bookData.title;

        updatBookModalData(bookData);
    })
}

function fillShelves() {
    // Get elements
    const grid = document.getElementById("gridContainer");
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;

    const items = grid.querySelectorAll(".shelf-item");

    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("empty")) {
            grid.removeChild(items[i]);
        }
    }
    
    let rows = Math.ceil(grid.children.length / cols);
    rows = Math.max(rows, 3);

    const totalSlots = cols * rows;
    const currentItems = grid.children.length;

    for (let i = currentItems; i < totalSlots; i++) {
        const filler = document.createElement("div");
        filler.classList.add("shelf-item", "empty");
        grid.appendChild(filler);
    }
}




// TODO

// In form, if pages == readPages, close off complete || if complete, readPages == pages

// Upon modal open, change heading depending if user is editing on adding

// Display books

// Add properties to the books
// <div 
//     popovertarget="modalBack" 
//     role="button"
//     tabindex="0">
//     Click me to open modal
// </div>