import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
// import { ChartjsPieComponent } from './../charts/chartjs/chartjs-pie.component';
// import { ChartModule } from 'angular2-chartjs';
// import { ChartjsBarComponent } from './../charts/chartjs/chartjs-bar.component';

@NgModule({
  imports: [
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    // ChartModule,
  ],
  declarations: [
    ...routedComponents,

  ],
})
export class EditorsModule { }
