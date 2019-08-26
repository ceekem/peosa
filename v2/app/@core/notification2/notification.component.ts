import { Component,
  OnInit, Output,
  EventEmitter } from '@angular/core';
import { NotificationService } from '../data/notification.service';
import { Subscription } from 'rxjs';

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
    message: ''
  };
  @Output() delEvent = new EventEmitter();
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

}
