import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from '../../../auth/auth-service.service';
import { NbLogoutComponent } from '@nebular/auth';
import { throwIfAlreadyLoaded } from '../../../@core/module-import-guard';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable} from 'rxjs';
import { User } from 'firebase';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

 // user: any;



  userMenu = [{ title: 'Profile', icon:'fa fa-user' },
              { title: 'Log out', icon:'fa fa-sign-out' }];

/*   public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
 */

 public userProfile: any;

 public users: any;

 public userss: any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private authS: AuthService,
              private analyticsService: AnalyticsService,
              private _firebaseAuth: AngularFireAuth,
              ) {

    /*             this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          //console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    ); */

                
  }



  ngOnInit() {
    /* this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
 */

  this.userService.getUser().on('value', userProfileSnapshot =>{

    this.userProfile = userProfileSnapshot.val();

    console.log(this.userProfile);

  });

  
   

  }





  logout(){
    this.authS.logout();
  }



  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
