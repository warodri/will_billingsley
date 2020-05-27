import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../models/book';
import { Author } from '../models/author';

/**
 * Default http options to send for most of our requests
 */
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * This is the API server
 */
const apiUrl = 'http://localhost:3000';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Handle errors
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            /**
             * Console log the error
             */
            console.error(error);
            /**
             * Return empty result
             */
            return of(result as T);
        };
    }

    /**
     * Get all books
     */
    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(apiUrl + '/books')
            .pipe(
                tap(heroes => {
                    console.log('fetched books');
                }),
                catchError(this.handleError('getBooks', []))
            );
    }

    /**
     * Get book by ID
     */
    getBook(id: string): Observable<Book> {
        const url = `${apiUrl}/book/${id}`;
        return this.http.get<Book>(url).pipe(
            tap(_ => {
                console.log(`fetched book id=${id}`);
            }),
            catchError(this.handleError<Book>(`getBook id=${id}`))
        );
    }

    /**
     * Add new Book
     */
    addBook(book: Book): Observable<Book> {
        return this.http.post<Book>(apiUrl + '/book', book, httpOptions).pipe(
            tap((addedBook: Book) => {
                console.log(`book added`);
            }),
            catchError(this.handleError<Book>('addBook'))
        );
    }

    /**
     * Update book by ID
     */
    updateBook(id: string, book: Book): Observable<any> {
        const url = `${apiUrl}/book/${id}`;
        return this.http.put(url, book, httpOptions).pipe(
            tap( () => {
                console.log(`updated book id=${id}`);
            }),
            catchError(this.handleError<any>('updateBook'))
        );
    }

    /**
     * Delete book by ID
     */
    deleteBook(id: string): Observable<Book> {
        const url = `${apiUrl}/book/${id}`;
        return this.http.delete<Book>(url, httpOptions).pipe(
            tap( () => {
                console.log(`deleted book id=${id}`);
            }),
            catchError(this.handleError<Book>('deleteBook'))
        );
    }


}
