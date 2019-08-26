import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '@firebase/auth-types';

@Injectable()
export class SmartTableService {

  public usersList:  AngularFireList<User>;

  constructor(private firelist: AngularFireDatabase){
    this.usersList = firelist.list('/users'); 
  }



  getUserss(): AngularFireList<User>{
    return this.usersList;
  
   }
}
