import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Book } from 'src/app/models/book';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Books';

    selectedBookId: string;

    constructor(
        private testService: TestService
    ) {}

    addBook() {
        this.testService.addBook();
    }

    getBooks() {
        this.testService.getAllBooks();
    }

    getBookById() {
        this.testService.getBook(this.selectedBookId);
    }

    updateBook() {
        const book = new Book();
        Object.assign(book, {
            title: 'Book title modified'
        })
        this.testService.updateBook(this.selectedBookId, book);
    }

    deleteBook() {
        this.testService.deleteBook(this.selectedBookId);
    }

}
