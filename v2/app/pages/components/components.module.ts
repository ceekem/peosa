import { NgModule } from '@angular/core';

import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsRoutingModule, routedComponents } from './components-routing.module';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';
import { ViewgalleryComponent } from './viewgallery/viewgallery.component';
import { DropzoneDirective } from '../../@theme/directives/dropzone.directive';
import { FormatFileSizePipe } from '../../@theme/pipes/file.pipe';
import { Initc } from '../news/initc';
import { NotificationComponent } from '../../@core/notification2/notification.component';


@NgModule({
  imports: [
    ThemeModule,
    ComponentsRoutingModule,
    TreeModule,
    ToasterModule.forRoot(),
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  declarations: [
    ...routedComponents,
    FormatFileSizePipe,
    DropzoneDirective,
    NotificationComponent
  ],
  providers: [

    Initc
  ],
})
export class ComponentsModule { }
