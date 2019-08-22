import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartjsPieComponent } from '../charts/chartjs/chartjs-pie.component';
@Component({
  selector: 'ngx-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss']
})

export class VoterComponent implements OnInit {
   Nomanies:any[] = ["Linux","Windows","MAC"];
   @Output() public ChartjsPieComponent: any;
  constructor() { }

  ngOnInit() {
    // get the votes
    //calc the results
    //display results
  }
   upvote(a){
    var x:number;
    for(x = 0;x<this.Nomanies.length;x++){
        if(a == this.Nomanies[x]){
            //up the vote
        }
    }
  }

}


