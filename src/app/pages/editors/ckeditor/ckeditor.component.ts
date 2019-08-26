import { Component } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService,NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import  * as firebase  from 'firebase';
import { User } from 'firebase';
// import './ckeditor.loader';
// import 'ckeditor';

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <nb-card>
      <nb-card-header>
        View Ballot Results
      </nb-card-header>
      <nb-card-body>
      <div class="col-lg-12">
      <nb-card>
        <nb-card-header>Total Number of Votes</nb-card-header>
        <nb-card-body>
        <chart type="bar" [data]="data" [options]="options"></chart>
      </nb-card-body>
    </nb-card>
  </div>
  <div class="col-lg-12">
      <nb-card>
      <nb-card-header>Vote Resuts</nb-card-header>
        <nb-card-body>
            <chart type="bar" [data]="data2" [options]="options"></chart>
      </nb-card-body>
    </nb-card>
  </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class CKEditorComponent {
  data: any;
  data2:any;
  optionsNames: any[] = [];
  optionsVotes:any[] =[];
  totalMembers:any;
  totalVotes:any;
  options: any;
  themeSubscription: any;
  difference:any;
  constructor(private theme: NbThemeService,private userService: UserService,) {
    this.userService.getUserss().snapshotChanges()
    .subscribe(res =>{
      this.totalMembers =  res.length;
      this.totalVotes = firebase.database().ref('votes/');
      
      console.log("res: ", res.length);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
  
        this.data = {
          labels:['Total Members', 'Total Votes', 'Remaing Votes'],
          datasets: [{
            data: [this.totalMembers,this.totalVotes,this.difference] ,
            label: 'Total Number of Votes',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          }],
        };
  
        this.data2 = {
          labels:this.optionsNames ,
          datasets: [{
            data:this.optionsVotes,
            label: 'Votes Results',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          }],
        };
  
        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });

    });



    
  }
  ngOnInit() {

  }

  //get total number of members
  //get total number of votes
  //get difference in both totals
  //display: total number of votes;total number of memeberes; and the difference between the two(pie) 
  // display votes for witch option(bar)
}
//<ckeditor [config]="{ extraPlugins: 'divarea', height: '320' }"></ckeditor>