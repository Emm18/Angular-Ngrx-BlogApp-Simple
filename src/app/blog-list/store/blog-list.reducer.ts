import { Blog } from 'src/app/models/blog.model';
import * as BlogListActions from './blog-list.action';

export interface State {
  blogs: Blog[];
  selectedBlog: Blog;
}

const initialState: State = {
  blogs: [
    {
      title: 'sample 1 title',
      content: 'sample 1 content',
    },
    {
      title: 'sample 2 title',
      content: 'sample 2 content',
    },
  ],
  selectedBlog: null,
};

export function blogListReducer(
  state = initialState,
  action: BlogListActions.BlogListActions
) {
  if (action.type === BlogListActions.GET_BLOG_DETAILS) {
    let blog = state.blogs.filter((blog, index) => index == action.payload)[0];

    return {
      ...state,
      selectedBlog: blog,
    };
  }

  if (action.type === BlogListActions.ADD_BLOG) {
    let newBlogList = [...state.blogs, action.payload];

    return {
      ...state,
      blogs: newBlogList,
    };
  }

  if (action.type === BlogListActions.UPDATE_BLOG) {
    let blogList = [...state.blogs];
    blogList[action.payload.id] = action.payload.blog;

    return {
      ...state,
      blogs: blogList,
    };
  }

  if (action.type === BlogListActions.DELETE_BLOG) {
    let blogs = state.blogs.filter((blog, index) => index != action.payload);

    return {
      ...state,
      blogs,
    };
  }

  return state;
}
