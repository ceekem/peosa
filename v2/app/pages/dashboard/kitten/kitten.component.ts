import { Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirestoreProvider } from '../../../@core/data/firestore.service';
import { Observable, interval  } from 'rxjs';
import { config } from '../../../@core/models/data.config';
import { News } from '../../../@core/models/news';


@Component({
  selector: 'ngx-kitten',
  styleUrls: ['./kitten.component.scss'],
  templateUrl: './kitten.component.html',

})
export class KittenComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  public newsList: News;

 public news : Observable<number[]>;

  newsLt : Array<any> = [this.newsList];



  constructor( private themeService: NbThemeService, private afs: AngularFirestore, private fireSP: FirestoreProvider ) {
   this.theme();

  
  }



  ngOnInit(){
   
    this.fireSP.getNews().subscribe(result =>{
      this.newsList = result;

      //this.newsLt = result;
      console.log(this.newsList);

  
 

    })


  }



  ngOnDestroy() {
    this.themeSubscription.unsubscribe();

   
  }


  theme(){

  this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

  }
}
