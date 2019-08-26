import { Component, OnInit, OnDestroy  } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import * as moment from 'moment';
import {FormGroup,
        FormBuilder} from '@angular/forms';
import * as $ from 'jquery';
import * as firebase from 'firebase/app';
import { NotificationService } from '../../../@core/data/notification.service'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Initc } from '../initc';


export interface News { id: string; imagePath: string; imageURL: string; headline: string; newstext: string ;userEmail: string; maintTs: string; }


@Component({
  selector: 'ngx-uploadnews',
  templateUrl: './uploadnews.component.html',
  styleUrls: ['./uploadnews.component.scss']
})
export class UploadnewsComponent implements OnInit {
  themeName = 'default';

  themeSubscription: Subscription;


  myForm: FormGroup;
  hline: string;
  imgPath: string;
  newstxt: string;
  private imagesCollection: AngularFirestoreCollection<News>;
  news: Observable<News[]>;
  modalImage: any;
  // main task
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;





  constructor(private themeService: NbThemeService,
              private fb: FormBuilder,
              private noteSvc: NotificationService,
              private afStorage: AngularFireStorage,
              private afs: AngularFirestore,
              private init : Initc,
            ) { 
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      init.init(theme.variables);
    });
  }


   ngOnInit() {
   
    this.createForm();
    this.loadImages();

  }

  createForm() {
    this.myForm = this.fb.group({
      headline: '',
      imageAvatar: null,
      newstxt: ''
    });
  }

  onUploadBtnClick() {

    if (this.hline === undefined && this.newstxt === undefined) {
  
      this.noteSvc.setNotification(
        'Missing Information',
        'Please provide both headline and news text(story) before you click on upload!'
        );
        $('.notification-btn').click();
    } else if (this.hline != undefined ){
      //$('#imageFile').click();
      this.onFileChange(event);
    }

  }
  
  onFileChange(event) {
    const reader = new FileReader();

    if(this.newstxt != undefined){
    
      $('#imageFile').click();
      
         if (event.target.files &&
      event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        $('#preview')
        .attr('src', URL.createObjectURL(event.target.files[0]));
      };
      
}

   this.startUpload(event.target.files);
  
   this.noteSvc.setNotification(
    'News Uploaded',
    'Your news have been uploaded!!'
    );
    $('.notification-btn').click();
        
      
  } else{

    this.noteSvc.setNotification(
      'Missing Information',
      'Please provide news story before you upload to save!'
      );
      $('.notification-btn').click();

  }
   
      
        
     
      
    

  }




  startUpload(event: FileList) {
    // File object

    const file = event.item(0);
    console.log(file);

    // client side validation
    if (file.type.split('/')[0] !== 'image') {

      this.noteSvc.setNotification(
        'Upload Error !!',
        'unsupported file type!...'
      );
      $('.notification-btn').click();
      
      console.error('unsupported file type!');
    }

    // storage path
    this.imgPath = `news/${new Date().getTime()}_${file.name}`;
    const fileRef = this.afStorage.ref(this.imgPath);

    // optional metadata
    const customMetadata = { app: 'News-Gallery'};
    // main task
    this.task = this.afStorage.upload(this.imgPath, file, { customMetadata });

    this.afStorage.upload(this.imgPath, file, { customMetadata });
    // observe percentage changes
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // The above step returns an observable which can be subscribed to fetch the data within it
          this.downloadURL.subscribe(data => {
            // to create an id for the document.
            const id = this.afs.createId();
            // storing downloadURL as imageURL
            const imageURL = data;
            // storing news path in firestore
            const imagePath = this.imgPath;
            // News name fetched from ngModel on 'hline' field
            const headline = this.hline;
            //News text fetched from ngModel on 'newstxt' field
            const newstext = this.newstxt;
            // To store timestamp of the news before being inserted in firestore
            const maintTs = moment().format('llll');
            const user = firebase.auth().currentUser;
            const userEmail = user.email;
            const news: News = { id, imagePath, imageURL, headline, newstext ,userEmail, maintTs };
            // news object inserted in news collection (AngularFirestoreCollection)
            this.imagesCollection.doc(id).set(news);
            // setting the news name back to blank
            this.hline = '';
            this.newstxt= '';
          });

        })
     )
    .subscribe();

  }

  loadImages() {
    const userEmail = firebase.auth().currentUser.email;
    this.imagesCollection = this.afs.collection<News>('news', ref => ref.where('userEmail', '==', userEmail).orderBy('maintTs', 'desc'));
    this.news = this.imagesCollection.valueChanges();
  
  }

/*   maximizeImage(news) {
    this.modalImage = news;
    console.log(news);
    this.noteSvc.setNotification(
      news.headline,
      news.imageURL
      );
      $('.max-img-notification-btn').click();
  }
  onDeleteClick(news) {
    this.modalImage = news;
    this.noteSvc.setNotification(
    'Confirmation',
    'Are you sure you want to remove ' + news.headline
    + ' from the system?'
    );
    $('.del-notification-btn').click();
  }
  deleteItem() {
    console.log('From notifications ' + this.modalImage.id);
    $('.cancel-del-modal').click();
    this.imagesCollection.doc(this.modalImage.id).delete();
    this.afStorage.ref(this.modalImage.imagePath).delete();

  } */





  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }


  

}
