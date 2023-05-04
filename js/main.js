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
console.log(books);