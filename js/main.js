const books = [];
const libraryInformation = {
    books: books.length,
    total_pages: 0,
    total_read_pages: 0,
    completed_books: 0,
    uncompleted_books: 0
}

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
        <button class="remove-book">X</button>
        <div class="book-info">
            <h2>${book.title}</h2>
            <span><span>${book.title}</span><span>${book.info().slice(book.title.length)}</span></span>
        </div>
        <div class="book-controls">
            <span>
                <label for="read-pages">Read:</label>
                <input id="read-pages" name="read-pages" value="${book.read}" max="${book.pages}" min="0" step="1" type="number" />
            </span>
            <button class="bookmark-button" type="button">Bookmarks</button>
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
    addBookEventListeners();
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
    const modalBody = `
        <form class="add-book-form" method="GET" action="#">
            <fieldset>
                <label for="add-book-title">Title:</label>
                <input id="add-book-title" name="title" type="text" required />
            </fieldset>
            <fieldset>
                <label for="add-book-author">Author:</label>
                <input id="add-book-author" name="author" type="text" required />
            </fieldset>
            <fieldset>
                <label for="add-book-pages">Pages:</label>
                <input id="add-book-pages" name="pages" type="number" min="0" required />
            </fieldset>
            <fieldset>
                <label for="add-book-read-pages">Read Pages:</label>
                <input id="add-book-read-pages" name="read-pages" type="number" min="0" required />
            </fieldset>
    `;
    const modalFooter = `
            <button class="add-book-button" type="submit">Add Book</button>
        </form>
    `;
    // const modal = createModal("Add Book", "Add a new book to the library", "Add");
    const modal = createModal("Add Book", modalBody, modalFooter);
    document.body.insertAdjacentHTML("beforeend", modal);
    addModalEventListeners();

    // When user clicks submit, create a new book and add it to the book-container
    
});


// Book buttons
// Book read pages inputs


// Book button handlers
function handleBookmarkButton(e) {
    const bookIndex = e.target.parentElement.parentElement.dataset.index;
    const book = books[bookIndex];
    // Open modal with inputs for a new book
    // When the input/textarea is clicked it should expand so you can easily read and write/rewrite notes for every bookmark
    // When you create a bookmark (in the footer of the modal we put the controls for this) the bookmarks page is the title plus Bookmark #n
    const modalBody = `
        <form class="add-book-form" method="GET" action="#">
            <fieldset>
                <label for="bookmark-1">Bookmark #1: Page 234</label>
                <input id="bookmark-1" name="bookmark-1" type="text" required value="My notes about this bookmark/page..." />
            </fieldset>
            <fieldset>
                <label for="bookmark-2">Bookmark #2: Page 10</label>
                <input id="bookmark-2" name="bookmark-2" type="text" required value="Notes about this page and book..." />
            </fieldset>
        </form>
    `;
    const modal = createModal("Bookmarks", modalBody, "");
    document.body.insertAdjacentHTML("beforeend", modal);
    addModalEventListeners();
};

// Book button event listeners
function addBookEventListeners() {
    // Book remove button
    const removeBookButtons = document.querySelectorAll(".remove-book");
    removeBookButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Remove book from books array
            const bookIndex = e.target.parentElement.dataset.index;
            books.splice(bookIndex, 1);

            // Remove book from DOM
            e.target.parentElement.remove();
        });
    });

    // Bookmark button
    const bookmarkButton = document.querySelectorAll(".bookmark-button");
    bookmarkButton.forEach(button => {
        button.addEventListener("click", handleBookmarkButton);
    });
}


// Closing Modal event listeners:
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

    const addBookButton = document.querySelector(".add-book-button");
    if (addBookButton !== null) {
        addBookButton.addEventListener("click", (e) => {
            e.preventDefault();
            const title = document.querySelector("#add-book-title").value;
            const author = document.querySelector("#add-book-author").value;
            const pages = document.querySelector("#add-book-pages").value;
            const read = document.querySelector("#add-book-read-pages").value;
            const book = new Book(title, author, pages, read);
            books.push(book);
            const bookElement = createBookElement(book);
            bookContainer.insertBefore(bookElement, addBook);
            addBookEventListeners();
            closeModal();
        });
    }
}

// Escape button when modal is open
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.querySelector(".modal-wrapper") !== null) {
        closeModal();
    }
});