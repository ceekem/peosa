import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription, Observable } from 'rxjs'
import { Initc } from '../../news/initc'
import { FirestoreProvider } from '../../../@core/data/firestore.service';
import { Gallery } from '../../../@core/models/gallery';
import * as $ from  'jquery';
import { NotificationService } from '../../../@core/data/notification.service'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';



@Component({
  selector: 'ngx-viewgallery',
  templateUrl: './viewgallery.component.html',
  styleUrls: ['./viewgallery.component.scss']
})
export class ViewgalleryComponent implements OnInit {
  themeName = 'default';
  themeSubscription: Subscription; 


  public galList : Gallery;

  public gallery: Array<any> = [this.galList];

  modalImage: any;
  
  public image : Observable<Gallery[]>;

  private imagesCollection: AngularFirestoreCollection<Gallery>;

  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage, public noteSvc: NotificationService, private themeService: NbThemeService, private initc: Initc, private fireSP: FirestoreProvider ) { 
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.initc.init(theme.variables);
    });

    this.imagesCollection = this.afs.collection<Gallery>('gallery');
      this.image = this.imagesCollection.valueChanges();
  }


  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit() {
  
    this.fireSP.getGal().subscribe(result =>{
      this.gallery = result;
      console.log(this.gallery);
    })
  
  }

  maximize(image){
    
    this.modalImage = image;
    this.noteSvc.setNotification(
      image.imageTitle,
      image.imageURL,
    ); 
    $('.max-img-notification-btn').click();
  }



  onDeleteClick(image){
    this.modalImage = image;
    this.noteSvc.setNotification(
      'Confirmation',
      //'Are you suer you want to remove ' + image.imageName?
      'Are you sure you want to remove this Image?'
    );
    $('.del-notification-btn').click();
  }

  deleteItem(){
    console.log('From notifications ' + this.modalImage.id);
    $('.cancel-del-modal').click();
    this.imagesCollection.doc(this.modalImage.id).delete();
    this.afStorage.ref(this.modalImage.imageURL).delete();
  }

}

