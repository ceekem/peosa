/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService } from '@nebular/theme';
import { AuthService } from './auth/auth-service.service';

import { from } from 'rxjs';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private menuService: NbMenuService, private authS: AuthService,) {
  }

 

  ngOnInit(): void {
    this.analytics.trackPageViews();

    this.menuService.onItemClick().subscribe((event) =>{
      this.onContextItemSelection(event.item.title)
    });

  }

  onContextItemSelection(title){
    if (title === 'Log out'){
      this.authS.logout();
    } 
    else if (title === 'Profil'){
      console.log('profile clicked');
    }
  }

  logout(){
    this.authS.logout();
  }
}
