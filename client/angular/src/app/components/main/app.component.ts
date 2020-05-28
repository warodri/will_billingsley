import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Book } from 'src/app/models/book';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponseBooks } from 'src/app/models/http-responses';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    arrBooks: Array<Book> = [];

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.loadBooks();
    }

    loadBooks() {
        this.apiService.getBooks().subscribe( (result: HttpResponseBooks) => {
            this.arrBooks = result.books;
        });
    }

    deleteBook(book: Book) {
        if (confirm(`Are you sure you want to remove ${ book.title }?`) === false) {
            return;
        }
    }

    editBook(book: Book) {
    }

    viewBook(book: Book) {
    }


}
