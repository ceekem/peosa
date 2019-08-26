import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { NotificationService } from '../../@core/data/notification.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { NotificationComponent } from '../../@core/notification/notification.component';
import { Initc } from './initc';


@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,

  ],
  declarations: [
    ...routedComponents,
     NotificationComponent
  ],
  providers: [
    AngularFireStorage,
    //NotificationService,
    Initc
  ],
})
export class NewsModule { }
