// Select elements
const modal = document.querySelector("#modalBack");
const addBtn = document.querySelector("#addBooksBtn");
const body = document.body;
const closeBtn = document.querySelector("#close-btn");
const form = document.getElementById('modal-form');

// Array
let library = [];

// Event Listeners

window.addEventListener("load", fillShelves);
window.addEventListener("resize", fillShelves);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addBookToLibrary();

    form.reset();

    modal.classList.remove("show");
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
    }

    body.style.overflow = "visible";
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

    displayBook(title, id);
}

function displayBook (title, id) {
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
    book.textContent = title;
    book.id = id;

    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("empty")) {
            items[i].classList.remove("empty");
            items[i].appendChild(book);
            return;
        }
    }

    const spot = document.createElement("div");
    spot.classList.add("shelf-item");
    grid.appendChild(spot);
    spot.appendChild(book);
        
    fillShelves();
}

function fillShelves() {
    // Get elements
    const grid = document.getElementById("gridContainer");
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;

    const items = grid.querySelectorAll(".shelf-item");

    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains(".empty")) {
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

// Get form values

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