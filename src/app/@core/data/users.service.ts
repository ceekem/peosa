
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import 'firebase/database';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '@firebase/auth-types';
import * as moment from 'moment';

let counter = 0;

 export interface Cases { caseLogged: string,
                         discription: string, 
                         incidentDate: string,
                         nature: string,
                         statementTaken:string  
                        } 

@Injectable()
export class UserService {


  private userArray: any[];

  private basePath ='/users/cases';

  

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  public usersList:  AngularFireList<User>;
  public usersListRec: AngularFireList<User>;

  public usersList2:  AngularFireList<User>;
 public caseList: firebase.database.Reference;



 public userList: Array<any>;

 ref : any;


  constructor(private firelist: AngularFireDatabase) {
    // this.userArray = Object.values(this.users);
    firebase.auth().onAuthStateChanged(user =>{
      if (user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`users/${user.uid}`);
      }
    });
 

    this.usersList = firelist.list('/users');  
    
    this.usersListRec = firelist.list('/users', ref => ref.orderByChild('/regDate').limitToFirst(8));

 
    //this.usersList2 = firelist.list('/users', ref => ref.child('cases')); 


    // this.caseList = firelist.list(`AdminCase`);
 
  }

  getUsersRec(): AngularFireList<User> {
    return this.usersListRec;
  } 

 getUserss(): AngularFireList<User>{
  return this.usersList;

 }

 getUserss2(): AngularFireList<User>{
  return this.usersList2;

 }

//  getCases(): AngularFireList<Cases> {

//  // return this.caseList;
//  }


 getCases2(){
  this.caseList = firebase.database().ref('/adminCase/');
 
  return this.caseList;
 }



//  getuserRef(){

//   this.ref = firebase.firestore().collection('/users');

//   console.log('getUserRef: ', this.ref);
//   return this.ref;

//  }

 



//  getcases(): firebase.database.Reference {
//   //this.caseList = firebase.database().ref(`users/${id}/cases`);
//   this.caseList = firebase.database().ref(`users/2FDazTizPVRUMB8VnCN7J2fiLx02/cases`);

//   return this.caseList;
//  }


//  getCasesChild(): firebase.database.Reference {
  
//  //this.caseList = firebase.database().ref(`users`).child('cases');
  
  
//   return this.caseList.child('cases');
//  }


/*  getCases(data){
 const obj = this.firelist.database.ref(this.basePath);
 obj.push(data);
 console.log('Success');
 } */

/* 
  getCasesList(id: string): AngularFireList<Cases>{
    this.caseList = this.firelist.list(`/users/${id}/cases`)
  return this.caseList;
  } */



  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

 /*  getUser(): Observable<any> {
     counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]); 

  }
 */
  getUser(): firebase.database.Reference {
    /* counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]); */
    return this.userProfile;
  }
}
