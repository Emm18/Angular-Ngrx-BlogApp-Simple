import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogDetailsComponent } from './blog-list/blog-details/blog-details.component';
import { BlogListComponent } from './blog-list/blog-list.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'blogList',
    pathMatch: 'full',
  },
  {
    path: 'blogList',
    component: BlogListComponent,
  },
  {
    path: 'blogList/details/:id',
    component: BlogDetailsComponent,
  },
  {
    path: 'createBlog',
    component: BlogCreateComponent,
  },
  {
    path: 'updateBlog/:id',
    component: BlogCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
