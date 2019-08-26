import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = {
    title: '',
    message: ''
  };

  newsNot = {
    title: '',
    message: '',
    text: ''
  };

  private subject = new Subject<any>();

  constructor() { }

  setNotification(title, message) {
    this.subject.next(
      this.notification = {
        title: title,
        message: message
      }
    );
  }

setNewsNoti(title, message, text){
  this.subject.next(
    this.newsNot = {
      title: title,
      message : message,
      text: text
    }
  );
}

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }
}
