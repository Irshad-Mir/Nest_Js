
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    title: string;
    price: number;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface AddUserArgs {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserArgs {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface CreateProjectDto {
    name: string;
    code: number;
}

export interface UpdateProjectDto {
    name: string;
    code: number;
    id: number;
}

export interface Book {
    id: number;
    title: string;
    price: number;
}

export interface Category {
    id: number;
    name: string;
    employee: Employee;
    employeeId?: Nullable<number>;
}

export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    designation: string;
    city?: Nullable<string>;
    project?: Nullable<Project>;
    projectId?: Nullable<number>;
    categories?: Nullable<Category[]>;
}

export interface Project {
    id: number;
    name: string;
    code: number;
    categories?: Nullable<Employee>;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    getAllBooks(): Book[] | Promise<Book[]>;
    bookById(bookId: number): Book | Promise<Book>;
    getAllUsers(): User[] | Promise<User[]>;
    UserById(userId: number): User | Promise<User>;
    findAllProject(): Project[] | Promise<Project[]>;
    updateProject(id: number): Project | Promise<Project>;
}

export interface IMutation {
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): string | Promise<string>;
    deleteUser(userId: number): string | Promise<string>;
    addUser(addUserArgs: AddUserArgs): string | Promise<string>;
    updateUser(updateUserArgs: UpdateUserArgs): string | Promise<string>;
    deleteProject(id: number): Project | Promise<Project>;
    createProject(createProjectDto: CreateProjectDto): Project | Promise<Project>;
    findOneProject(updateProjectDto: UpdateProjectDto): Project | Promise<Project>;
}

type Nullable<T> = T | null;
