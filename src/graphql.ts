
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookAgrs {
    id: number;
    title: string;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    price: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    getBookById(bookId: number): Nullable<Book> | Promise<Nullable<Book>>;
}

export interface IMutation {
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBookArgs: AddBookAgrs): string | Promise<string>;
    updateBook(bookId: number, updateBookArgs: AddBookAgrs): string | Promise<string>;
}

type Nullable<T> = T | null;
