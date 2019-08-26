import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ VoterComponent } from '../voter/voter.component';

const routes: Routes = [{
    path: '',
    component: VoterComponent,
}];

export class VoterRoutingModule {}