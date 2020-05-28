export class Book {
    _id?: string;
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate: string | Date;
    thumbnailUrl: string;
    shortDescription: string;
    longDescription?: string;
    status: string;
    authors: Array<string>;
    categories: Array<string>;
}
