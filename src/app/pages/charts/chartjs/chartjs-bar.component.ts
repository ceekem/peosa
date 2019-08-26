// import { Component, OnDestroy } from '@angular/core';
// import { NbThemeService, NbColorHelper } from '@nebular/theme';
// import {functions} from 'firebase';
// import firebase = require('firebase');

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// // import { environment } from '../environments/environment';
// @Component({
//   selector: 'ngx-chartjs-bar',
//   template: `
//    <chart type="bar" [data]="data" [options]="options"></chart>`
// //  template :'<h1>Cast Your Vote:</h1>Nomanies: <div class="col-lg-4"><button class="btn-primary"  (click)="voteCast(1)">Vote n1</button></div><div class="col-lg-4"><button class="btn-primary"  (click)="voteCast(2)">Vote n2</button></div><div class="col-lg-4"><button class="btn-primary"  (click)="voteCast(3)">Vote n3</button></div>',
// })
// export class ChartjsBarComponent implements OnDestroy {
//   data: any;
//   options: any;
//   themeSubscription: any;
//   nomanies:string[] = [ "N1" ,"N2","N3" ];
//   n1:number = 300;
//   n2:number = 500;
//   n3:number = 100;
//   // database = firebase.database();
//   constructor(private theme: NbThemeService) {
//     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

//       const colors: any = config.variables;
//       const chartjs: any = config.variables.chartjs;

//       this.data = {
//         labels: this.nomanies,
//         datasets: [{
//           data: [this.n1,this.n2 , this.n3],
//           label: 'Number of Votes',
//           backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
//         }],
//       };

//     //   this.options = {
//     //     maintainAspectRatio: false,
//     //     responsive: true,
//     //     legend: {
//     //       labels: {
//     //         fontColor: chartjs.textColor,
//     //       },
//     //     },
//     //     scales: {
//     //       xAxes: [
//     //         {
//     //           gridLines: {
//     //             display: false,
//     //             color: chartjs.axisLineColor,
//     //           },
//     //           ticks: {
//     //             fontColor: chartjs.textColor,
//     //           },
//     //         },
//     //       ],
//     //       yAxes: [
//     //         {
//     //           gridLines: {
//     //             display: true,
//     //             color: chartjs.axisLineColor,
//     //           },
//     //           ticks: {
//     //             fontColor: chartjs.textColor,
//     //           },
//     //         },
//     //       ],
//     //     },
//     //   };
//     });
//   }
//   public voteCast(x):void{
//     console.log('clicked');
//     // alert(x);
//     switch (x){
//       case 1:
//         this.n1 += 1;
//         console.log(this.n1);
//         // firebase.database().ref('/votes').push({n1: this.n1});
//         this.constructor();
//         break;
//       case 2:
//         this.n2 += 1;
//         console.log(this.n2);
//         // firebase.database().ref('/votes').push({n2: this.n2});
//         this.constructor();
//         break;
//       case 3:
//         this.n3 += 1;
//         console.log(this.n3);
//         // firebase.database().ref('/votes').push({n3: this.n3});
//         this.renderGraph();
//         break;
//       default:
//         alert("failed to vote, please try again later");
//         break;      
//    }
// }
// public renderGraph():void{
//   console.log("renderGraph called");
//   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

//     const colors: any = config.variables;
//     const chartjs: any = config.variables.chartjs;
//   this.data = {
//     labels: this.nomanies,
//     datasets: [{
//       data: [this.n1,this.n2 , this.n3],
//       label: 'Number of Votes',
//       backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
//     }],
//   };
// });
// } 
//   ngOnDestroy(): void {
//     this.themeSubscription.unsubscribe();
//   }
// }
