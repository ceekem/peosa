import { Component,
  OnInit, Output,
  EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { NotificationService } from '../data/notification.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirestoreProvider } from '../data/firestore.service';
import * as $ from 'jquery';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { News } from '../../pages/news/uploadnews/uploadnews.component';


@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  modalItem: string;
  //path = 'https://firebasestorage.googleapis.com/v0/b/firegallery-fbe8d.appspot.com/o/';
  notification = {
    title: '',
    message: '',
    text: ''
  };


    
  id: string = '';
  title: string = '';
  message: string = '';
  text: string = '';


  @Output() delEvent = new EventEmitter();

  @Output() savEvent = new EventEmitter();

  subscription: Subscription;


  constructor(private noteSvc: NotificationService) { }

  ngOnInit() {
    this.subscription = this.noteSvc.getNotification()
    .subscribe(notification => {
      this.notification = notification;
    });

  }


  deleteItem() {
   this.delEvent.emit();
  }

  
 saveItem(){
   this.savEvent.emit();
 }

}
