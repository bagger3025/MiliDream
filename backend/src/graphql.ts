
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Class {
    key: number;
    name: string;
}

export class Category {
    key: number;
    name: string;
}

export class User {
    key: number;
    classKey: number;
    userId: string;
    userPassword: string;
    userName: string;
    class: Class;
}

export class Post {
    key: number;
    userKey: number;
    categoryKey: number;
    title: string;
    body: string;
    time: string;
    viewCount: number;
    postUser: User;
    comments?: Nullable<Nullable<Comment>[]>;
    category: Category;
}

export class Comment {
    key: number;
    userKey?: Nullable<number>;
    postKey: number;
    time: string;
    body: string;
    parentKey?: Nullable<number>;
    childComment?: Nullable<Nullable<Comment>[]>;
    commentUser?: Nullable<User>;
}

export abstract class IQuery {
    abstract user(key: number): Nullable<User> | Promise<Nullable<User>>;

    abstract allPosts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract post(key: number): Nullable<Post> | Promise<Nullable<Post>>;
}

type Nullable<T> = T | null;
