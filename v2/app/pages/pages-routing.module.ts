import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'cases',
    loadChildren: './cases/cases.module#casesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
   },
  // {
  //   path: 'maps',
  //   loadChildren: './maps/maps.module#MapsModule',
  // }, {
  //   path: 'charts',
  //   loadChildren: './charts/charts.module#ChartsModule',
  // }, 
  {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, 
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
  },
  
  {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  // } ,{
  //   path: 'voter',
  //   loadChildren:'./voter/voter.module#VoterModule',
  }
  , {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
