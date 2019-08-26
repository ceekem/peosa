import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { TreeComponent } from './tree/tree.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';
import { ViewgalleryComponent } from './viewgallery/viewgallery.component';

const routes: Routes = [{
  path: '',
  component: ComponentsComponent,
  children: [
  {
    path: 'tree',
    component: TreeComponent,
  }, {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'uploadgallery',
    component: UploadgalleryComponent,
  },
  {
    path: 'viewgallery',
    component: ViewgalleryComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }

export const routedComponents = [
  ComponentsComponent,
  TreeComponent,
  NotificationsComponent,
  UploadgalleryComponent,
  //UploadgalleryComponent,
  ViewgalleryComponent,
];
