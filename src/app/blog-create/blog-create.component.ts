import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as BlogListActions from '../blog-list/store/blog-list.action';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit, OnDestroy {
  blogform: FormGroup;
  editMode = false;
  id: number;
  showInvalids = false;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppSate>
  ) {}

  ngOnInit() {
    this.blogform = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });

    this.sub1 = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id || this.id == 0) {
        this.sub2 = this.store.select('blogList').subscribe((state) => {
          if (!state.blogs[this.id]) {
            this.router.navigate(['createBlog']);
          }

          this.blogform.patchValue({
            title: state.blogs[this.id].title,
            content: state.blogs[this.id].content,
          });
        });

        this.editMode = true;
      } else {
        this.editMode = false;
      }
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

  onSubmit() {
    if (this.blogform.valid) {
      if (!this.editMode) {
        console.log('save');
        let newBlog = new Blog(
          this.blogform.value['title'],
          this.blogform.value['content']
        );
        this.store.dispatch(new BlogListActions.AddBlog(newBlog));
        this.router.navigate(['/blogList']);
      } else {
        console.log('updated');
        let updatedBlog = new Blog(
          this.blogform.value['title'],
          this.blogform.value['content']
        );
        this.store.dispatch(
          new BlogListActions.UpdateBlog({ id: this.id, blog: updatedBlog })
        );
        this.router.navigate(['/blogList']);
      }
      console.log(this.blogform);
      this.showInvalids = false;
    } else {
      this.showInvalids = true;
    }
  }

  onCancel() {
    this.router.navigate(['blogList']);
  }
}
