// Event Listeners

window.addEventListener("load", fillShelves);

window.addEventListener("resize", fillShelves);

let library = []

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

function addBookToLibrary (title, author, pages, readPages, completed, notes, rating) {
    let id = crypto.randomUUID();
    library.push(new Book(id, title, author, pages, readPages, completed, notes, rating));
}

function fillShelves() {
    // Get elements
    const grid = document.getElementById("gridContainer");
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;

    const fillers = grid.querySelectorAll(".empty");

    for (let i = 0; i < fillers.length; i++) {
        grid.removeChild(fillers[i]);
    }
    
    let rows = Math.ceil(grid.children.length / cols);
    rows = Math.max(rows, 2);

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