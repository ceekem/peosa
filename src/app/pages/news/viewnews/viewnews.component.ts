import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirestoreProvider } from '../../../@core/data/firestore.service';
import { Observable, interval  } from 'rxjs';
import * as $ from  'jquery';
import { NotificationService } from '../../../@core/data/notification.service'
import { News } from '../../../@core/models/news';
import { Initc } from '../initc';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ngx-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss']
})
export class ViewnewsComponent implements OnInit {
  themeName = 'default';
  settings: Array<any>;
  themeSubscription: Subscription;

  public newsList: News;

  public news : Observable<News[]>;
 
   newsLt : Array<any> = [this.newsList];

   modalNews: any;

   newshl : string;
   newstxt: string;
 
   private newsCollection: AngularFirestoreCollection<News>;


  constructor(private router: Router, private route: ActivatedRoute, public afStorage: AngularFireStorage, public noteSvc: NotificationService, public init : Initc, private themeService: NbThemeService, private afs: AngularFirestore, private fireSP: FirestoreProvider ) { 
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      init.init(theme.variables);
      console.log(theme.name);

      if(theme.name === 'corporate'){
        $('#cad').removeClass('.nb').addClass('.nb2')
      }

    });

    this.newsCollection = this.afs.collection<News>('news' );
    this.news = this.newsCollection.valueChanges();
  }



  maximize(news){
    this.modalNews = news;
    this.noteSvc.setNewsNoti(
      news.headline,
      news.imageURL,
      news.newstext
    ); 
    $('.max-news-notification-btn').click();

    console.log(news);
  }

  onDeleteClick(news){
    this.modalNews = news;
    this.noteSvc.setNotification(
      'Confirmation',
      //'Are you suer you want to remove ' + image.imageName?
      'Are you sure you want to remove this Image?'
    );
    $('.del-notification-btn').click();
  }

  deleteItem(){
    console.log('From notifications ' + this.modalNews.id);
    $('.cancel-del-modal').click();
    this.newsCollection.doc(this.modalNews.id).delete();
    this.afStorage.ref(this.modalNews.imageURL).delete();
  }


  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit() {

    
    this.fireSP.getNews().subscribe(result =>{
      this.newsList = result;

      //this.newsLt = result;
      console.log(this.newsList);
    
    });
  }


  edit(news){
  

    this.modalNews = news;
    this.newshl = news.headline;
    this.newstxt = news.newstext;

    this.noteSvc.setNewsNoti(
      this.newshl,
      news.imageURL,
      this.newstxt
    ); 
    $('.edit-news-notification-btn').click();


   // this.updateNews(this.modalNews.id, )
    console.log(news);

  }

  
  saveItem(){
    console.log('From notifications save' + this.modalNews.id);
  
    

    $('.cancel-edit-modal').click();
    
   
    this.newsCollection.doc(this.modalNews.id).update({headline: $('#title').val(), newstext: $('#txtarea').val()});
    /* this.updateNews(this.modalNews.id, {headline: $('#title').val(), newstext: $('#txtarea').val()}).subscribe(res =>{
      this.router.navigate(['/news'])
    }); */
  }
 

/* updateNews(id: string, data): Observable<any>{
return new Observable((observer) =>{
  this.newsCollection.doc(id).set(data).then(()=>{
    observer.next();
  },(err)=>{
    console.log('error: ' + err)
  });
});

}
 */

}
