import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { User } from 'firebase';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import  * as firebase  from 'firebase';
import * as firebase2 from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from "lodash";
import { load } from '@angular/core/src/render3/instructions';
import { keyframes } from '@angular/animations';




export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file:File){
    this.file = file;
  }
}




@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

  `],
})
export class SmartTableComponent {
  closeResult: string;

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
      idNo: {
        title: 'ID Number',
        type: 'string',
      },
      name: {
        title: 'name',
        type: 'string',
      },
      PCD_cell_phone: {
        title: 'Phone Number',
        type: 'number',
      },
      DOB: {
        title: 'Date of Birth',
        type: 'string',
      },
      PCD_email: {
        title: 'E-mail',
        type: 'string',
      },
      gender: {
        title: 'gender',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  public users: Array<any>;


  private basePath:string = '/docsUploads';
  uploads: AngularFireList<Upload[]>;


  //user data
  name: any;
  idNo: any;
  DOB: any;
  initials: any;
  title: any;
  gender: any;
  language: any;

    tel_phone: any;
    cell_phone: any;
    address: any;
    city: any;
    code: any;
    email: any;



    em_number: any;
    position: any;
    employer_name: any;
    work_place: any;
    employer_address: any;
    province: any;
    code2: any;
    tel_phone_em: any;
    fax_phone_em: any;



    bank: any;
    acc_no: any;
    branch: any;
    acc_type: any;
    eff_date: any;


    data: any;



    selectedFiles: FileList;
    currentUpload: Upload;




  constructor(private service: SmartTableService, private modalService: NgbModal, private af: AngularFirestore, private db: AngularFireDatabase) {



    this.service.getUserss().snapshotChanges()
    .subscribe(res =>{

      this.users = [];
      res.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;
       this.users.push(x as User);
       this.source.load(this.users);
        this.data = this.users;
       console.log('source: ',this.data)
        console.log('source2: ', this.source)
      });
    });

   // const data = this.service.getUserss();

  }


  //=================== file upload ===================================================================

  pushUpload(upload: Upload){

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    let ref =


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) =>{
      //upload in progress
      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },
    (error) =>{
      //upload failed
      console.log("error: ",error)
    },
    ()=>{
      //upload Success

       uploadTask.snapshot.ref.getDownloadURL().then(url =>{
        upload.url = url;

         console.log("url: ", upload.url);
         upload.name = upload.file.name;

         console.log('name: ', upload.name);
         this.saveFileData(upload);

         this.saveMember(upload.url, upload.name)

      });


    });



  }


// Write the file details to the realtime db
private saveFileData(upload: Upload){
  this.db.list(`${this.basePath}/`).push(upload);
}


//delete file and user
deleteUpload(upload: Upload){
  this.deleteFileData(upload.$key)
  .then(()=>{
    this.deleteFileStorage(upload.name)
  })
  .catch(error =>{
    console.log('error: ', error)
  })
}


//Deletes the file details from the realtime db
private deleteFileData(key: string){
  return this.db.list(`${this.basePath}/`).remove(key)
}

//firebase files must have unique names in their respective storage dir
//So the names serves as a unique key
private deleteFileStorage(name: string){
  let storageRef = firebase.storage().ref();
  storageRef.child(`${this.basePath}/${name}`).delete();
}


//=====================Front==========================

detectFiles(event){
  this.selectedFiles = event.target.files;
}

uploadSingle(){
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.pushUpload(this.currentUpload);


    // this.currentUpload = undefined;

}

uploadMulti(){
  let files = this.selectedFiles
  let filesIndex = _.range(files.length)
  _.each(filesIndex, (idx) =>{
    this.currentUpload =new Upload(files[idx]);
    this.pushUpload(this.currentUpload);
  })
}

//====================================================

//==========================================================================================================

  open(content) {

    console.log("current: ", this.currentUpload);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  saveMember(fURL, fNAME){

    firebase.database().ref('members').push({
      name: this.name,
      idNo: this.idNo,
      DOB: this.DOB,
      initials: this.initials,
      title: this.title,
      gender: this.gender,
      language: this.language,

        PCD_tel_phone: this.tel_phone,
        PCD_cell_phone: this.cell_phone,
        PCD_address: this.address,
        PCD_city: this.city,
        PCD_code: this.code,
        PCD_email: this.email,

      personal_CD: {
        tel_phone: this.tel_phone,
        cell_phone: this.cell_phone,
        address: this.address,
        city: this.city,
        code: this.code,
        email: this.email
      },


          ED_em_number: this.em_number,
          ED_position: this.position,
          ED_employer_name: this.employer_name,
          ED_work_place: this.work_place,
          ED_employer_address: this.employer_address,
          ED_province: this.province,
          ED_code: this.code2,
          ED_tel_phone_em: this.tel_phone_em,
          ED_fax_phone_em: this.fax_phone_em,

      employment_D: {
        em_number: this.em_number,
        position: this.position,
        employer_name: this.employer_name,
        work_place: this.work_place,
        employer_address: this.employer_address,
        province: this.province,
        code: this.code2,
        tel_phone_em: this.tel_phone_em,
        fax_phone_em: this.fax_phone_em
      },


          DO_bank: this.bank,
          DO_acc_no: this.acc_no,
          DO_branch: this.branch,
          DO_acc_type: this.acc_type,
          DO_eff_date: this.eff_date,

      debit_Order:{
        bank: this.bank,
        acc_no: this.acc_no,
        branch: this.branch,
        acc_type: this.acc_type,
        eff_date: this.eff_date
      },

      fileURL: fURL,
      fileName: fNAME,
  });

  this.name = '';
  this.idNo = '';
  this.DOB = '';
  this.initials = '';
  this.title = '';
  this.gender = '';
  this.language = '';

    this.tel_phone = '';
    this.cell_phone = '';
    this.address = '';
    this.city = '';
    this.code = '';
    this.email = '';


    this.em_number = '';
    this.position = '';
    this.employer_name = '';
    this.work_place = '';
    this.employer_address = '';
    this.province = '';
    this.code2 = '';
    this.tel_phone_em = '';
    this.fax_phone_em = '';


    this.bank = '';
    this.acc_no = '';
    this.branch = '';
    this.acc_type = '';
    this.eff_date = '';

  }

}
