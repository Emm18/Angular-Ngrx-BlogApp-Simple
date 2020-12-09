import { Action } from '@ngrx/store';
import { Blog } from 'src/app/models/blog.model';

export const GET_BLOGS = '[Blog-List] Get blogs';
export const GET_BLOG_DETAILS = '[Blog-List] Get blog details';
export const ADD_BLOG = '[Blog-List] Add blog';
export const UPDATE_BLOG = '[Blog-List] Update Blog';
export const DELETE_BLOG = '[Blog-List] Delete Blog';

export class GetBlogs implements Action {
  readonly type = GET_BLOGS;

  constructor(public payload: Blog[]) {}
}

export class GetBlogDetails implements Action {
  readonly type = GET_BLOG_DETAILS;

  constructor(public payload: number) {}
}

export class AddBlog implements Action {
  readonly type = ADD_BLOG;

  constructor(public payload: Blog) {}
}

export class UpdateBlog implements Action {
  readonly type = UPDATE_BLOG;

  constructor(public payload: { id: number; blog: Blog }) {}
}

export class DeleteBlog implements Action {
  readonly type = DELETE_BLOG;

  constructor(public payload: number) {}
}

export type BlogListActions =
  | GetBlogs
  | GetBlogDetails
  | AddBlog
  | UpdateBlog
  | DeleteBlog;
