import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Author } from 'src/app/models/author';
import { HttpResponseAuthors } from 'src/app/models/http-responses';
import { Book } from 'src/app/models/book';

/**
 * Simple constants to prevent hardcoding strings
 */
const PUBLISH = 'PUBLISH';
const UNPUBLISH = 'UNPUBLISH';

@Component({
    selector: 'app-add-book',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddBookComponent implements OnInit {

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


    constructor(
        private apiService: ApiService
    ) { }


    ngOnInit(): void {
        this.setupForm();
        this.getAuthors();
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
    getAuthors() {
        this.apiService.getAuthors().subscribe((res: HttpResponseAuthors) => {
            this.arrAuthors = res.authors;
        });
    }

    /**
     * Call this function each time an author is selected
     */
    authorSelected(elem: any) {
        const value: string = elem.target.value;
        this.arrSelectedAuthors = this.arrSelectedAuthors.filter( a => {
            return (a !== value);
        })
        this.arrSelectedAuthors.push(value);
    }

    /**
     * Remove a previously selected author
     */
    removeAuthor(author: string) {
        this.arrSelectedAuthors = this.arrSelectedAuthors.filter( item => {
            return (item !== author);
        });
    }

    /**
     * Call this function each time a category is selected
     */
    categorySelected(elem: any) {
        const value: string = elem.target.value;
        this.arrSelectedCategories = this.arrSelectedCategories.filter( a => {
            return (a !== value);
        })
        this.arrSelectedCategories.push(value);
    }

    /**
     * Remove a previously selected cateogry
     */
    removeCategory(category: string) {
        this.arrSelectedCategories = this.arrSelectedCategories.filter( item => {
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
        this.form.controls.authors.setValue( this.arrSelectedAuthors );
        this.form.controls.categories.setValue( this.arrSelectedCategories );
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
         * Send this object
         */
        this.apiService.addBook(book).subscribe( (result) => {
            location.href = '/';
        });
    }

}
