import { Component } from '@angular/core';
import  * as firebase  from 'firebase';
@Component({
  selector: 'ngx-tiny-mce-page',
  template: `
    <nb-card>
      <nb-card-header>
        Upload Ballot
      </nb-card-header>
      <nb-card-body>
        Survey Tilte:  <input type="text" (keyup)="onKey($event)"><br>
        Duration of Survey: <input type="date" (blur)="onKey3(duration.value)" #duration min="{{d8 | date:'yyyy-MM-dd'}}"><br>
        Survey Question: <textarea min="10" (keyup)="onKey2($event)"></textarea><br>
        Add Options:  <input type="text" min="2" #box (keyup.enter)="onClick(box.value)"><button (click)="onClick(box.value)">add option</button>
        <br><ul><li *ngFor="let opt of options">{{Options}}</li></ul>
        <br><br><button (click)="publish()">Publish Survey</button>
      </nb-card-body>
    </nb-card>
  `,
})
export class TinyMCEComponent {
  Title:any;
  Question:any;
  Options:any[] = [];
  Duration:any;
  d8 = new Date();
  database;any = firebase.database();
  public publish():any{
    //push to firebase
    firebase.database().ref('votes/').set({
        SurveyTitle: this.Title,
        Duration:this.Duration,
        Question:this.Question,
        Options:this.Options
    });
    console.log("Title: ",this.Title, "Question: ",this.Question,"Duration: ", this.Duration);
  }
  onKey(event: any) { // without type info
    this.Title = event.target.value;
  }
  onKey2(event: any) { // without type info
    this.Question = event.target.value;
  }
  onClick(box: string) {
    console.log(box);
    this.Options.push(box);
    console.log("after push: ", this.Options);
  }
  onKey3(duration: Date){
    this.Duration = duration;
  }
}
