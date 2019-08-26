import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadnewsComponent } from './uploadnews/uploadnews.component';
import { ViewnewsComponent } from './viewnews/viewnews.component';
import { NewsComponent } from './news.component';



const routes: Routes = [{
  path: '',
  component: NewsComponent,
  children: [{
    path: 'uploadnews',
    component: UploadnewsComponent,
  }, {
    path: 'viewnews',
    component: ViewnewsComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class NewsRoutingModule {

}

export const routedComponents = [
    NewsComponent,
    UploadnewsComponent,
    ViewnewsComponent,
];