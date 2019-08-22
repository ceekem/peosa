import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>`,
})

export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  nomanies:string[] = [ "N1" ,"N2","N3" ];
  n1:number = 300;
  n2:number = 500;
  n3:number = 100;
  constructor(private theme: NbThemeService) {



    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
        
      this.data = {
        labels: this.nomanies,
        datasets: [{
          data: [this.n1,this.n2 , this.n3],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
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
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  
  
public voteCast(x):void{
      // console.log('clicked');
      // alert(x);
      switch (x){
        case 'n1':
          this.n1++;
          console.log(this.n1);
          this.renderGraph();
          break;
        case 'n2':
          this.n2++;
          console.log(this.n2);
          this.renderGraph();
          break;
        case 'n3':
          this.n3++;
          console.log(this.n3);
          this.renderGraph();
          break;
        default:
          alert("failed to vote, please try again later");
          break;      
     }
  }

public renderGraph():void{
  console.log("renderGraph called");
} 
}
