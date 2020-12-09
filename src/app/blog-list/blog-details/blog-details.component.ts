import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';

import * as fromApp from '../../store/app.reducer';

import * as BlogListActions from '../store/blog-list.action';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blogId: number;
  blog: Blog;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppSate>
  ) {}

  ngOnInit(): void {
    this.sub1 = this.route.params.subscribe((params: Params) => {
      this.blogId = params['id'];
      this.store.dispatch(new BlogListActions.GetBlogDetails(this.blogId));

      this.sub2 = this.store.select('blogList').subscribe((state) => {
        this.blog = state.selectedBlog;
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  editBlog() {
    this.router.navigate(['updateBlog', this.blogId]);
  }

  deleteBlog() {
    this.store.dispatch(new BlogListActions.DeleteBlog(this.blogId));
    this.router.navigate(['/blogList']);
  }

  back() {
    this.router.navigate(['/blogList']);
  }
}
