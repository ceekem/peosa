import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService,NbColorHelper } from '@nebular/theme';

import { UserService } from '../../../@core/data/users.service';

import { User } from 'firebase';
import { AuthService } from '../../../auth/auth-service.service';
import { Users } from '../../../@core/users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NetworkStatusService } from 'ng-network-status';
import { NotificationService } from '../../../@core/data/notification.service';
import { a } from '@angular/core/src/render3';
// import { NbThemeService,  } from '@nebular/theme';
import * as admin from 'firebase-admin';
// import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  networkStatus = "";

  element: any;

  public users: Array<any>;

  public usersprof : any;
  
   
  public usersRec: Array<any>;
  public usersRecBar:Array<any> = [0,0,0,0,0,0,0,0,0,0,0,0];
  public usersRecPie:Array<any>;
  //==================================================


  data: any;
  options: any;
  themeSubscriptions: any;
  members:string[] = [ "Active" ,"Inactive","Default" ];
  active:number = 0;
  inactive:number = 0;
  default:number = 0;
// =======================bar graph

data2: any;
//   options: any;
  // themeSubscription: any;
  months:any[] = [ "Jan" ,"Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec" ];



  //==================================================

  constructor(private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private db : AngularFireDatabase,
              private authS: AuthService,
              private networkStatusService: NetworkStatusService,
              public noteSvc: NotificationService,
              private theme: NbThemeService
              ) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });




      this.myInit();


    }
 



  myInit(){
    console.log("myInit() was called")

    this.userService.getUserss().snapshotChanges()
    .subscribe(res =>{
      
      console.log("res: ", res.length);
    
      this.users = [];
      res.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;
       this.users.push(x as User);
      //  console.log("DATA: ", this.users[0]);
        
      });
      this.themeSubscriptions = this.theme.getJsTheme().subscribe(config => {



        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
          
        this.data = {
          labels: this.members,
          datasets: [{
            data: [res.length,this.inactive , this.default],
            backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
          }],
        };
      
        this.data2 = {
          labels: this.months,
          datasets: [{
            data: [this.usersRecBar[0],this.usersRecBar[1],this.usersRecBar[2],this.usersRecBar[3],this.usersRecBar[4],this.usersRecBar[5],this.usersRecBar[6],this.usersRecBar[7],this.usersRecBar[8],this.usersRecBar[9],this.usersRecBar[10],this.usersRecBar[11]],
            label: 'member account creation',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          }],
        };
      
        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      });




    
    });

    for(let x in this.users){
      let regDate:any[] = this.users[x]['regDate'].split(",");
      // console.log("regDate: ",regDate[2].substring(1,5));
      if(regDate[2].substring(1,5) == (new Date().getFullYear())){
          console.log("its this year: ",regDate[1].substring(1,4))
         
          if(regDate[1].substring(1,4) == 'Jan'){
            this.usersRecBar[0] = ++this.usersRecBar[0];
              // console.log("Jan DATA : ", this.usersRecBar[0])
          }else if(regDate[1].substring(1,4) == 'Feb'){
            this.usersRecBar[1] = ++this.usersRecBar[1];
            // console.log("Feb DATA : ", this.usersRecBar[1])
          }else if(regDate[1].substring(1,4) == 'Mar'){
            this.usersRecBar[2] = ++this.usersRecBar[2];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Apr'){
            this.usersRecBar[3] = ++this.usersRecBar[3];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'May'){
            this.usersRecBar[4] = ++this.usersRecBar[4];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Jun'){
            this.usersRecBar[5] = ++this.usersRecBar[5];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Jul'){
            this.usersRecBar[6] = ++this.usersRecBar[6];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Aug'){
            this.usersRecBar[7] = ++this.usersRecBar[7];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Sep'){
            this.usersRecBar[8] = ++this.usersRecBar[8];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Oct'){
            this.usersRecBar[9] = ++this.usersRecBar[9];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Nov'){
            this.usersRecBar[10] = ++this.usersRecBar[10];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }else if(regDate[1].substring(1,4) == 'Dec'){
            this.usersRecBar[11] = ++this.usersRecBar[11];
            // console.log("Mar DATA : ",this.usersRecBar[2])
          }

  

      }else{
        console.log("its not this year")
      }
    }
    console.log("Jan DATA : ", this.usersRecBar[0])
    console.log("Feb DATA : ", this.usersRecBar[1])
    console.log("Jun DATA : ",this.usersRecBar[5])




  }



  ngOnInit() {

    this.networkStatusService.healthCheck();
  
    this.networkStatusService.isOnline.subscribe(isOnline => {
      this.networkStatus = isOnline ? "Online" : "Offline";

    
  
 
    if(this.networkStatus == "Online"){


       this.userService.getUserss().snapshotChanges()
      .subscribe(res =>{
      

        this.users = [];
        res.forEach(element =>{
          let x = element.payload.toJSON();
          x["$key"] = element.key;
         this.users.push(x as User);

        
         
        });  

            
      });
      
    
     
      this.userService.getUsersRec().snapshotChanges()
      .subscribe(res =>{
        this.usersRec = [];
        res.forEach(element =>{
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.usersRec.sort((a,b) => a.regDate - b.regDate).push(x as User); 
        });  
      });


}
else{
 
  alert("Oops check your internet connection! ");
  window.location.reload()
}


});  

  }

  public getPiegraph(){

  }
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
