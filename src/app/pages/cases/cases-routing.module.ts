import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { casesComponent } from './cases.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { ModalsComponent } from './modals/modals.component';
import { TypographyComponent } from './typography/typography.component';
import { TabsComponent, Tab1Component, Tab2Component } from './tabs/tabs.component';
import { SearchComponent } from './search-fields/search-fields.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ViewcasesComponent } from './viewcases/viewcases.component';



const routes: Routes = [{
  path: '',
  component: casesComponent,
  children: [
    {
      path:'viewcases',
      component: ViewcasesComponent,
    },
 
    {
    path: 'buttons',
    component: ButtonsComponent,
  }, {
    path: 'grid',
    component: GridComponent,
  }, {
    path: 'icons',
    component: IconsComponent,
  }, {
    path: 'modals',
    component: ModalsComponent,
  }, {
    path: 'popovers',
    component: PopoversComponent,
  }, {
    path: 'typography',
    component: TypographyComponent,
  }, {
    path: 'search-fields',
    component: SearchComponent,
  }, {
    path: 'tabs',
    component: TabsComponent,
    children: [{
      path: '',
      redirectTo: 'tab1',
      pathMatch: 'full',
    }, {
      path: 'tab1',
      component: Tab1Component,
    }, {
      path: 'tab2',
      component: Tab2Component,
    }],
    
  }],
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class casesRoutingModule { }
