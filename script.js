// Select elements
const modal = document.querySelector("#modalBack");
const addBtn = document.querySelector("#addBooksBtn");
const body = document.body;
const closeBtn = document.querySelector("#close-btn");
const form = document.getElementById('modal-form');
const pagesInput = document.getElementById("pages");
const pagesReadInput = document.getElementById("pagesRead");
const completedInput = document.getElementById("completed");
const removeBtn = document.getElementById("remove");
const confirmModal = document.getElementById("remove-modal");
const closeBtnTwo = document.getElementById("close-btn-2");
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

// Global variables/arrays
let library = [];
let editingBookId = null;

// Event Listeners
window.addEventListener("load", fillShelves);
window.addEventListener("resize", fillShelves);

addBtn.addEventListener("click", () => {
    editingBookId = null;
    showModal("Add Book");
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

removeBtn.addEventListener("click", () => {
    confirmModal.classList.add("show");
});
closeBtnTwo.addEventListener("click", () => {
    confirmModal.classList.remove("show");
});
noBtn.addEventListener("click", () => {
    confirmModal.classList.remove("show");
});
confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
        confirmModal.classList.remove("show");
    };
});

pagesInput.addEventListener("input", () => {
    if (pagesInput.value) {
        pagesReadInput.disabled = false;
        pagesReadInput.max = pagesInput.value;
        completedInput.disabled = false;
    } else {
        pagesReadInput.disabled = true;
        pagesReadInput.value = "";
        completedInput.disabled = true;
    }
});

pagesReadInput.addEventListener("input", () => {
    if (Number(pagesInput.value) === Number(pagesReadInput.value)) {
        completedInput.checked = true;
    } else {
        completedInput.checked = false;
    }
});

completedInput.addEventListener("change", () => {
    if (completedInput.checked) {
        pagesReadInput.value = pagesInput.value;
    } else {
        if (Number(pagesInput.value) === Number(pagesReadInput.value)) {
            completedInput.checked = true;
        }
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Read all form values
    const formData = new FormData(form);
    const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        pages: formData.get("pages"),
        readPages: formData.get("pagesRead"),
        completed: formData.get("completed") ? true : false,
        notes: formData.get("notes"),
        rating: formData.get("stars")
    };

    if (editingBookId) {
        // Editing existing book
        const book = library.find(b => b.id === editingBookId);
        Object.assign(book, bookData);

        // Update DOM
        const bookDiv = document.getElementById(editingBookId);
        bookDiv.textContent = book.title;

        editingBookId = null;
    } else {
        // Adding new book
        addBookToLibrary(bookData);
    }

    form.reset();
    closeModal();
});

// --- Functions ---
function showModal(titleText) {
    modal.classList.add("show");
    document.getElementById("modal-title").textContent = titleText;

    if (editingBookId) {
        const book = library.find(b => b.id === editingBookId);
        remove.style.display = "block";
        fillForm(book);
    } else {
        form.reset();
        remove.style.display = "none";
    }
}

function closeModal() {
    modal.classList.remove("show");
}

function fillForm(book) {
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("pages").value = book.pages;
    document.getElementById("pagesRead").value = book.readPages;
    document.getElementById("notes").value = book.notes;
    document.getElementById("completed").checked = book.completed;

    const ratingInputs = document.querySelectorAll("input[name='stars']");
    ratingInputs.forEach(input => {
        input.checked = input.value === book.rating;
    });
}

function Book(id, data) {
    this.id = id;
    Object.assign(this, data);
}

function addBookToLibrary(data) {
    const id = crypto.randomUUID();
    const book = new Book(id, data);
    library.push(book);

    displayBook(book);
}

function selectColour() {
    const colours = ["#D96F32","#D93232","#326FD9","#32D96F","#D9327C","#7C32D9"];

    return colours[Math.floor(Math.random()*colours.length)];
}

function displayBook(book) {
    const grid = document.getElementById("gridContainer");
    const items = grid.querySelectorAll(".shelf-item");
    const bookDiv = document.createElement("div");

    bookDiv.classList.add("book");
    bookDiv.style.backgroundColor = selectColour();
    bookDiv.textContent = book.title;
    bookDiv.id = book.id;

    // Find first empty shelf-item
    for (let item of items) {
        if (item.classList.contains("empty")) {
            item.classList.remove("empty");
            item.appendChild(bookDiv);
            addBookClickListener(bookDiv);
            return;
        }
    }

    // If no empty slot, create new
    const newSlot = document.createElement("div");
    newSlot.classList.add("shelf-item");
    grid.appendChild(newSlot);
    newSlot.appendChild(bookDiv);
    addBookClickListener(bookDiv);
    fillShelves();
}

function addBookClickListener(bookDiv) {
    bookDiv.addEventListener("click", () => {
        editingBookId = bookDiv.id;
        showModal("Edit Book");
    });
}

function fillShelves() {
    const grid = document.getElementById("gridContainer");
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const items = grid.querySelectorAll(".shelf-item");

    // Remove old empty placeholders
    items.forEach(item => {
        if (item.classList.contains("empty")) grid.removeChild(item);
    });

    let rows = Math.ceil(grid.children.length / cols);
    rows = Math.max(rows, 3);
    const totalSlots = cols * rows;

    for (let i = grid.children.length; i < totalSlots; i++) {
        const filler = document.createElement("div");
        filler.classList.add("shelf-item", "empty");
        grid.appendChild(filler);
    }
}
