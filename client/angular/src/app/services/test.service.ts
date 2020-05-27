import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Book } from '../models/book';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(
        private apiService: ApiService
    ) { }

    /**
     * Add dummy book
     */
    addBook() {
        /**
         * Demo data to insert
         */
        const values = {
            title: 'Unlocking Android',
            isbn: '1933988673',
            pageCount: 416,
            publishedDate: new Date().toISOString(),
            thumbnailUrl: `https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg`,
            shortDescription: `Unlocking Android: A Developer's Guide provides concise,
            hands-on instruction for the Android operating system and development tools.
            This book teaches important architectural concepts in a straightforward writing
             style and builds on this with practical and useful examples throughout.`,
            longDescription: `Android is an open source mobile phone platform based on
                the Linux operating system and developed by the Open Handset Alliance,
                a consortium of over 30 hardware, software and telecom companies that
                focus on open standards for mobile devices. Led by search giant, Google`,
            authors: ['W. Frank Ableson', 'Charlie Collins', 'Robi Sen'],
            categories: ['Open Source', 'Mobile'],
            status: 'PUBLISH'
        };

        /**
         * Create object to insert
         */
        const book = new Book();
        Object.assign(book, values);

        /**
         * Send to server
         */
        this.apiService.addBook(book).subscribe(res => {
            console.dir(res);
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Get all dummy books
     */
    getAllBooks() {
        this.apiService.getBooks().subscribe(res => {
            console.dir(res);
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Get dummy book by ID
     */
    getBook(id: string) {
        this.apiService.getBook(id).subscribe(res => {
            console.dir(res);
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Update BOOK by ID
     */
    updateBook(id: string, newData: Book) {
        this.apiService.updateBook(id, newData).subscribe(res => {
            console.dir(res);
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * Delete book by ID
     */
    deleteBook(id: string) {
        this.apiService.deleteBook(id).subscribe(res => {
            console.dir(res);
        }, (err) => {
            console.log(err);
        });
    }

}
