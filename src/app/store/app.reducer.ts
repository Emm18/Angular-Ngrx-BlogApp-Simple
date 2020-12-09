import { ActionReducerMap } from '@ngrx/store';

import * as fromBlogList from '../blog-list/store/blog-list.reducer';

export interface AppSate {
  blogList: fromBlogList.State;
}

export const appReducer: ActionReducerMap<AppSate> = {
  blogList: fromBlogList.blogListReducer,
};
