import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { News} from '../models/news';
import { Images } from '../models/images';
import { config } from '../models/data.config';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
// import firestore from 'firebase/firestore';
import { QuerySnapshot } from '@firebase/firestore-types';
import { Gallery } from '../../pages/components/uploadgallery/uploadgallery.component';
import * as $ from 'jquery';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';


@Injectable()
export class  FirestoreProvider {

  news: AngularFirestoreCollection<News>;

  ref = firebase.firestore().collection('news').orderBy('maintTs', 'desc');

  refG = firebase.firestore().collection('gallery').orderBy('maintTs', 'desc');

  modalImage: any;

 newsCollection : AngularFirestoreCollection<News>;

  constructor(private afs: AngularFirestore){

    this.newsCollection = this.afs.collection<News>('news' );

  }




getNews(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
                id: doc.id,
                imagePath: data.imagePath,
                imageURL: data.imageURL,
                headline: data.headline,
                newstext: data.newstext,
                userEmail: data.userEmail,
                maintTs: data.maintTs,  
          });
        });
        observer.next(boards);
      });
    });
  }



updateNews(id: string, data) : Observable<any>{
    return new Observable ((observer) =>{
      this.newsCollection.doc(id).set(data).then(()=>{
        observer.next()
      });
    });
}


  getGal(): Observable<any> {
    return new Observable((observer) => {
      this.refG.onSnapshot((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
                id: doc.id,
                imagePath: data.imagePath,
                imageURL: data.imageURL,
                imageTitle: data.imageTitle,
                maintTs: data.maintTs,
                userEmail: data.userEmail, 
          });
        });
        observer.next(boards);
      });
    });
  }
  


  getNewsList(){
      return new Promise<any>((resolve, reject) =>{
          this.afs.collection('/news').snapshotChanges().subscribe(snapshots =>{
              resolve(snapshots);
          });
      });
  }


  getImages(): AngularFirestoreCollection<Images>{
      return this.afs.collection('gallery', ref => ref.orderBy('mainTs', 'desc'));
  }
}