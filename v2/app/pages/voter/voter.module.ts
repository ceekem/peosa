import { NgModule, Input, Output, EventEmitter} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { ChartjsPieComponent } from '../charts/chartjs/chartjs-pie.component';
import { PagesComponent } from '../pages.component';
// import { MiscellaneousRoutingModule, routedComponents } from './miscellaneous-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    // ChartjsPieComponent,
    PagesComponent,
    EventEmitter
    // MiscellaneousRoutingModule,
  ],
  declarations: [
    // ...routedComponents,
  ],
})
export class VoterModule { }