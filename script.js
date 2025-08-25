let library = []

function Book (id, title, author, pages, readPages, status, notes, rating) {
    this.id = id,
    this.title = title,
    this.author = author,
    this.pages = pages,

    // If all pages are read, status is true
    this.status = pages === readPages ? true : status,

    // If the book is completed, the read pages is the number of pages in the book
    this.readPages = status ? pages : readPages,

    this.notes = notes,
    this.rating = rating
}