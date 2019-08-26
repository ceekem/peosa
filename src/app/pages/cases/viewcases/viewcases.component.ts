import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription, Observable } from 'rxjs';
import { UserService} from '../../../@core/data/users.service';
import { User, database } from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { Users } from '../../../@core/users/users';

import { Initc } from './initc'

import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { query } from '@angular/core/src/render3/query';
import { sortByTime } from '@swimlane/ngx-charts/release/utils';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import firebase = require('firebase');

import  * as firebase  from 'firebase';

export interface Cases { caseLogged: string,
  discription: string,
  incidentDate: string,
  nature: string,
  statementTaken:string,

 }


@Component({
  selector: 'ngx-viewcases',
  templateUrl: './viewcases.component.html',
  styleUrls: ['./viewcases.component.scss']
})
export class ViewcasesComponent implements OnInit {
  themeName = 'default';
  closeResult: string;

  themeSubscription: Subscription;

  public users: Array<any>;

  public casess :  Cases[];

   public cases: AngularFireList<Cases[]> = null;

   public caseList: Array<any>;

   public agents: any[];




   settings = {

    actions:{
      add: false,
    },
     add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      employeeRepresentative: {
        title: 'Name',
        type: 'string',
        width: '150px',
        editable: false,
      },
      caseType: {
        title: 'Case Type',
        type: 'string',
        editable: false,
      },
      externalCaseNum: {
        title: ' Case Number',
        type: 'string',
        editable: false,
      },
      misconductNumber: {
        title: 'Misconduct Number',
        type: 'string',
        editable: false,
      },
      withness: {
        title: 'withness',
        type: 'string',
        editable: false,
      },
      //  caseAssignedTo: {
      //   title: 'assigned to',
      //   type: 'html',
      //   editor:{
      //     type: 'list',
      //     config: {
      //       list: [
      //       {  value: '--', title: '--'},
      //       {  value: 'Alabama Shakes', title: 'Alabama Shakes'},
      //       { value: 'Daft Punk', title: 'Daft Punk'},
      //       { value: 'John Doe', title: 'John Doe'},
      //       { value: 'Mary Ann', title: 'Mary Ann'},
      //       { value: 'Cory Blue', title: 'Cory blue'}]
      //     }
      //   },
      //   width: '120px',
      // },
    //  caseStatus: {
    //     title: 'Status',
    //     type: 'html',
    //     editor:{
    //       type: 'list',
    //       config: {
    //         list: [
    //         {  value: 'Open', title: 'Open'},
    //         {  value: 'Assigned', title: 'Assigned'},
    //         { value: 'Closed', title: 'Closed'},
    //         ]
    //       }
    //     },
    //   },
    },
  };

  source: LocalDataSource = new LocalDataSource();


  cases3 : AngularFireList<Cases>

  userCases: any = [];
  userCases2: any = [];

//Current State

  ECN: any;
  MN: any;
  ER1: any;
  CD1: any;
  PO: any;
  CD2: any;
  ER2: any;
  CD3: any;
  Wi: any;
  CD4: any;
  Sum: any
  caseType: any = "Select Case Type";
  caseStatus: any = "Select Case Status";

  //Future State

  ECN1: any;
  rn: any;
  mb: any;
  caseDate: any;
  party1: any;
  p1Name: any;
  p1Con: any;
  erName: any;
  erCon: any;
  poName: any;
  poCon: any;
  party2: any;
  p2Name: any;
  p2Con: any;
  wName: any;
  wCon: any;
  desc: any;









  constructor(private themeService: NbThemeService,
              private userService: UserService,
              private db : AngularFireDatabase,
              private fb : FirebaseApp,
              private service: SmartTableService,
              private initc : Initc,
              private modalService: NgbModal
              ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.initc.init(theme.variables);
    });

    this.cases3 = db.list('/complaints/currentState');



  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open1(future) {
    this.modalService.open(future, {ariaLabelledBy: 'modal-basic-title1'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit() {

    // this.userService.getCases2().on('value', function (snapshot) {

    //   console.log(snapshot.val())

    // })






    this.cases3.snapshotChanges().subscribe(cases =>{
      this.userCases = [];
      cases.forEach(casess =>{
        this.userCases.sort((val)=> {return new Date(val.caseLogged)}).push(casess.payload.val());


      });
      this.source.load(this.userCases);
      this.source.setSort([{
        field: 'complaintLogged',
        direction: 'desc'
      }])
    });

  }


casePop():void
{
  console.log("coplaint clicked");
}



onDeleteConfirm(event): void {
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}

currentSave(): any{
    // console.log(
    //   "save",
    //   "ecn",this.ECN,
    //   "ER1",this.ER1,
    //   "ER2", this.ER2,
    //   "ER3", this.ER3,
    //   "MN", this.MN,
    //   "PO", this.PO,
    //   "Wi", this.Wi,
    //   "Sum", this.Sum
    // )
  firebase.database().ref('complaints/currentState').push({
    externalCaseNum: this.ECN,
    misconductNumber: this.MN,
    caseType: this.caseType,
    caseStatus: this.caseStatus,
    employeeRepresentative: this.ER1,
    employeeContactDetails: this.CD1,
    presidingOfficer: this.PO,
    pocontactDetails: this.CD2,
    employerRepresentative: this.ER2,
    employerContactDetails: this.CD3,
    withness: this.Wi,
    withnessContactDetails: this.CD4,
    summary: this.Sum,
  });

  this.ECN = "";
  this.MN= ""
  this.ER1= "";
  this.CD1= "";
  this.PO= ""
  this.CD2= "";
  this.ER2= "";
  this.CD3= "";
  this.Wi= ""
  this.CD4= "";
  this.Sum= "";
  this.caseStatus= "";
  this.caseType= "";

}



futureSave(): any{
  // console.log(
  //   "save",
  //   "ecn",this.ECN,
  //   "ER1",this.ER1,
  //   "ER2", this.ER2,
  //   "ER3", this.ER3,
  //   "MN", this.MN,
  //   "PO", this.PO,
  //   "Wi", this.Wi,
  //   "Sum", this.Sum
  // )
firebase.database().ref('complaints/futureState').push({
    externalCaseNum: this.ECN1,
    referenceNum: this.rn,
    managedBy: this.mb,
    caseDate: this.caseDate,
    caseType: this.caseType,
    caseStatus: this.caseStatus,
    matterType: "",
    party1: {
      Type: this.party1,
      partyName: this.p1Name,
      partyCon: this.p1Con,
    },
    employeeRepresentative: {
      employeeRep: this.erName,
      employeeCon: this.erCon,
    },
    presidingOfficer: {
      presidingOfficerName: this.poName,
      presidingOfficercon: this.poCon,
    },
    party2: {
      Type: this.party2,
      partyName: this.p2Name,
      partyCon: this.p2Con,
    },
    // party2: this.party2,
    // party2Name: this.p2Name,
    // party2Con: this.p2Con,
    withness: {
      withnessName: this.wName,
      withnessCon: this.wCon,
    },

    Summary: this.desc


});

  this.ECN1=""
  this.rn=""
  this.mb=""
  this.caseDate=""
  this.party1=""
  this.p1Name=""
  this.p1Con=""
  this.erName=""
  this.erCon=""
  this.poName=""
  this.party2=""
  this.p2Name=""
  this.p2Con=""
  this.wName=""
  this.wCon=""
  this.desc=""

}


}
