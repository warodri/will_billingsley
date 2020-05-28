import { Component, OnInit } from '@angular/core';
import { PUBLISH, UNPUBLISH } from '../../common/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Author } from 'src/app/models/author';
import { HttpResponseAuthors, HttpResponseBook } from 'src/app/models/http-responses';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditBookComponent implements OnInit {

    /**
     * I use FormGroup for data input from users
     */
    form: FormGroup;

    /**
     * List of authors from API
     */
    arrAuthors: Array<Author> = [];

    /**
     * List of authors selected for this book
     */
    arrSelectedAuthors: Array<string> = [];

    /**
     * List of categories selected for this book
     */
    arrSelectedCategories: Array<string> = [];

    /**
     * Simple variables to prevent hardcoding strings
     */
    PUBLISH = PUBLISH;
    UNPUBLISH = UNPUBLISH;

    /**
     * Book we are editing
     */
    book: Book;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.setupForm();
        this.getAuthors(() => {
            this.getBook();
        });
    }

    /**
     * Create form and receive input from users
     * to create a new book
     */
    setupForm() {
        this.form = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            isbn: new FormControl(null, [Validators.required]),
            pageCount: new FormControl(null, [Validators.required]),
            publishedDate: new FormControl(null, [Validators.required]),
            thumbnailUrl: new FormControl(null, [Validators.required]),
            shortDescription: new FormControl(null, [Validators.required]),
            longDescription: new FormControl(),
            status: new FormControl(PUBLISH, [Validators.required]),
            authors: new FormControl(null, [Validators.required]),
            categories: new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Get authors from API
     */
    getAuthors(callback) {
        this.apiService.getAuthors().subscribe((res: HttpResponseAuthors) => {
            this.arrAuthors = res.authors;
            callback();
        });
    }

    /**
     * Go to the server and get this Book by ID
     */
    getBook() {
        this.route.params.subscribe(params => {
            const bookId = params.id;
            this.apiService.getBook(bookId).subscribe( (result: HttpResponseBook) => {
                this.book = result.book;
                this.setFormValues();
            });
        });
    }

    /**
     * Once we get the book information, show on screen
     */
    setFormValues() {
        this.form.controls.title.setValue( this.book.title );
        this.form.controls.isbn.setValue( this.book.isbn );
        this.form.controls.pageCount.setValue( this.book.pageCount );
        this.form.controls.publishedDate.setValue( this.book.publishedDate.toString().substring(0, 10) );
        this.form.controls.thumbnailUrl.setValue( this.book.thumbnailUrl );
        this.form.controls.shortDescription.setValue( this.book.shortDescription );
        this.form.controls.longDescription.setValue( this.book.longDescription );
        this.form.controls.status.setValue( this.book.status );
        /**
         * Arrays for selected authors and categories.
         * This is shown as buttons on screen.
         */
        this.arrSelectedAuthors = this.book.authors;
        this.arrSelectedCategories = this.book.categories;
    }

    /**
     * Call this function each time an author is selected
     */
    authorSelected(elem: any) {
        const value: string = elem.target.value;
        this.arrSelectedAuthors = this.arrSelectedAuthors.filter(a => {
            return (a !== value);
        });
        this.arrSelectedAuthors.push(value);
    }

    /**
     * Remove a previously selected author
     */
    removeAuthor(author: string) {
        this.arrSelectedAuthors = this.arrSelectedAuthors.filter(item => {
            return (item !== author);
        });
    }

    /**
     * Call this function each time a category is selected
     */
    categorySelected(elem: any) {
        const value: string = elem.target.value;
        this.arrSelectedCategories = this.arrSelectedCategories.filter(a => {
            return (a !== value);
        })
        this.arrSelectedCategories.push(value);
    }

    /**
     * Remove a previously selected cateogry
     */
    removeCategory(category: string) {
        this.arrSelectedCategories = this.arrSelectedCategories.filter(item => {
            return (item !== category);
        });
    }

    /**
     * Sends the information to the API
     */
    saveBook() {
        /**
         * Get selected authors and categories as array
         */
        this.form.controls.authors.setValue(this.arrSelectedAuthors);
        this.form.controls.categories.setValue(this.arrSelectedCategories);
        /**
         * Validate required fields
         */
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            alert('Please fill all the required fields');
            return;
        }
        /**
         * Create object to send to our API
         */
        const book = new Book();
        Object.assign(book, this.form.value);
        /**
         * Update book
         */
        this.apiService.updateBook(this.book._id, book).subscribe((result) => {
            location.href = '/';
        });
    }

    /**
     * Simply redirection to the home page
     */
    goHome() {
        location.href = '/';
    }

}
