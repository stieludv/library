const books = [];

function Book(title, author, pages, read) {
    // Accepts title, author, pages and read arguments
    this.title = title; 
    this.author = author;
    this.pages = pages; // Total pages in book
    this.read = read; // The page you have currently read to (0 === not started, page 69 of 178?, page 178 of 178 === completed)
}

Book.prototype.info = function() {
    // Return core Book info in one string
    let readStatus = "not read yet"
    if (this.read === this.pages) {
        readStatus = "completed"
    }
    else if (this.read > 0) {
        readStatus = `read ${this.read} pages`;
    }

    // Returns something similar to: "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
}

books.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, 0));
books.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, 78));
books.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, 295));
console.log(books)

// Create the book elements for the book-container
function createBookElement(book) {
    const bookElement = document.createElement("div");
    // Give bookElement a data attribute of the index of the book in the books array
    bookElement.dataset.index = books.indexOf(book);

    bookElement.innerHTML = `
        <p>X</p>
        <p>${book.info()}</p>
        <div>
            <label for="read-pages">Read:</label>
            <input id="read-pages" name="read-pages" value="${book.read}" max="${book.pages}" min="0" step="1" type="number" />
            <button type="button">Bookmarks</button>
        </div>
    `;

    // I also need an input at the bottom to adjust the current page I'm on
    // I also need a bookmark icon to click to open the modal for bookmarks (digital bookmarks of pages + notes)
    // Book front cover image?
    return bookElement;
}

// Get the container element where we want to add books
const bookContainer = document.querySelector(".book-container");

// Get the "book" that we want to insert before
const addBook = document.querySelector(".add-book");

// For every book in books, generate and insert book element
books.forEach(book => {
    const bookElement = createBookElement(book);
    bookContainer.insertBefore(bookElement, addBook);
});


// Pass in title as string and body and footer as template literals HTML
function createModal(title, body, footer) {
    const modal = `
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-modal-button">X</button>
                </div>
                <div class="modal-body">
                    ${body}
                </div>
                <div class="modal-footer">
                    ${footer}
                </div>
            </div>
        </div>
    `;

    return modal;
}

function closeModal() {
    // Remove modal from DOM
    const modal = document.querySelector(".modal-wrapper");
    modal.remove();
}



// Event listeners

// Add book button
addBook.addEventListener("click", () => {
    // Open modal with inputs for a new book
    const modal = createModal("Add Book", "Add a new book to the library", "Add");
    document.body.insertAdjacentHTML("beforeend", modal);
    addModalEventListeners();

    // When user clicks submit, create a new book and add it to the book-container
    
});



// Book buttons
// Book read pages inputs


// Book bookmarks button


// Book remove button



// Closing Modal:
function addModalEventListeners() {
    // Modal remove button
    const closeModalButton = document.querySelector(".close-modal-button")
    if (closeModalButton !== null) {
        closeModalButton.addEventListener("click", (e) => {
            closeModal();
        });
    }

    // Modal wrapper click
    const modalWrapper = document.querySelector(".modal-wrapper");
    if (modalWrapper !== null) {
        modalWrapper.addEventListener("click", (e) => {
            if (e.target === modalWrapper) {
                closeModal();
            }
        });
    }
}

// Escape button when modal is open
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.querySelector(".modal-wrapper") !== null) {
        closeModal();
    }
});