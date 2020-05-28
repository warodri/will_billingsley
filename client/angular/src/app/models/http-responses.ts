import { Author } from './author';
import { Book } from './book';

export class HttpResponseAuthors {
    authors: Array<Author>;
}

export class HttpResponseBooks {
    books: Array<Book>;
}
export class HttpResponseBook {
    book: Book;
}
