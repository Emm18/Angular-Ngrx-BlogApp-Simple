import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Blog } from '../models/blog.model';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[];

  constructor(private store: Store<fromApp.AppSate>, private router: Router) {}

  private storeSubscription: Subscription;

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('blogList')
      .subscribe((blogListState) => {
        console.log(blogListState);
        this.blogs = blogListState.blogs;
      });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  viewBlogDetails(id: number) {
    this.router.navigate(['/blogList/details', id]);
  }
}
