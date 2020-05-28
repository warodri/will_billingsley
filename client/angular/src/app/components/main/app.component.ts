import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponseBooks } from 'src/app/models/http-responses';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    /**
     * List of all our books
     */
    arrBooks: Array<Book> = [];

    constructor(
        private apiService: ApiService
    ) {}


    ngOnInit(): void {
        this.loadBooks();
    }

    /**
     * Get from server all our books
     */
    loadBooks() {
        this.apiService.getBooks().subscribe( (result: HttpResponseBooks) => {
            this.arrBooks = result.books;
        });
    }

    /**
     * Deleltes a book from the list
     */
    deleteBook(book: Book) {
        if (confirm(`Are you sure you want to remove ${ book.title }?`) === false) {
            return;
        }
    }

    /**
     * Calls the component for editing a book
     */
    editBook(book: Book) {
        location.href = '/book-edit/' + book._id;
    }

    /**
     * Calls the component for viewing a book
     */
    viewBook(book: Book) {
        location.href = '/book-view/' + book._id;
    }


}
