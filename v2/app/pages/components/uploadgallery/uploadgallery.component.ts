import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import * as moment from 'moment';


import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';


import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';


import * as $ from 'jquery';
import { NotificationService } from '../../../@core/data/notification.service'

import { UserService } from '../../../@core/data/users.service';


export interface Gallery { id: string; imageTitle: string ;imagePath: string; imageURL: string; userEmail: string; maintTs: string }

@Component({
  selector: 'ngx-uploadgallery',
  templateUrl: './uploadgallery.component.html',
  styleUrls: ['./uploadgallery.component.scss']
})
export class UploadgalleryComponent implements OnInit {

  image: any = null;
  
//Main Task
task: AngularFireUploadTask;

//Progress monitoring
percentage: Observable<number>;

snapshot: Observable<any>;

//Download URL
downloadURL : Observable<string>;

//State for dropzone css toggling
isHovering: boolean;

userProfile: any;

gallery: Observable<Gallery[]>;


private galleryCollection: AngularFirestoreCollection<Gallery>;
 
imgTitle: string;

  constructor(private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private userService: UserService,
    private noteSvc: NotificationService) {

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  upLoadbtn(){
    if( this.imgTitle === undefined){
      console.log('upload Error, title');
      this.noteSvc.setNotification(
        'Upload Error',
        'please Enter a title for the image'
      );
      $('.notification-btn').click();
    }
    else{
      document.getElementById('getFile').click()
    }
  }

  startUpload(event: FileList) {
    if( this.imgTitle === undefined){
      console.log('upload Error, title');
      this.noteSvc.setNotification(
        'Upload Error',
        'please Enter a title for the image'
      );
      $('.notification-btn').click();
    }
    else{
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
     
      this.noteSvc.setNotification(
        'Upload Error !!',
        'unsupported file type!...'
      );
      $('.notification-btn').click();

      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `AdminGallery/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = { app: 'Admin' };


    //test
   // const mytext =  {mytext: 'mine'}

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          //this.db.collection('gallery').add( { path, size: snap.totalBytes })
        }
      })
    )


    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        // The above step returns an observable which can be subscribed to fetch the data within it
        this.downloadURL.subscribe(data => {
          // to create an id for the document.
          const id = this.db.createId();
          // storing downloadURL as imageURL
          const imageURL = data;
          const imagePath = path;
          const imageTitle = this.imgTitle;
          // To store timestamp of the news before being inserted in firestore
          const maintTs = moment().format('llll');
          const user = firebase.auth().currentUser;
          const userEmail = user.email;
          const gallery: Gallery = { id, imageTitle ,imagePath, imageURL ,userEmail, maintTs };
          // news object inserted in news collection (AngularFirestoreCollection)
          this.galleryCollection.doc(id).set(gallery);
          // setting the news name back to blank
          this.imgTitle = ''
        });

      })
   )
  .subscribe();

    }
  } 


  loadGallery() {
    const userEmail = firebase.auth().currentUser.email;
    this.galleryCollection = this.db.collection<Gallery>('gallery', ref => ref.where('userEmail', '==', userEmail).orderBy('maintTs', 'desc'));
    this.gallery = this.galleryCollection.valueChanges();
  }


  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }



  

  ngOnDestroy() {
  
  } 

  ngOnInit() {
    this.userService.getUser().on('value', userProfileSnapshot =>{

      this.userProfile = userProfileSnapshot.val();
  
      console.log(this.userProfile);
  
    });
  


    this.loadGallery()

  }

}







