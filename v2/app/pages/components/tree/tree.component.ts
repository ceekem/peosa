import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { isReactNative } from '@firebase/util';

@Component({
  selector: 'ngx-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {



//Main Task
task: AngularFireUploadTask;

//Progress monitoring
percentage: Observable<number>;

snapshot: Observable<any>;

//Download URL
downloadURL : Observable<string>;

//State for dropzone css toggling
isHovering: boolean;

constructor(private storage: AngularFireStorage){

}


toggleHover(event: boolean){
  this.isHovering = event;
}

startUpload(event: FileList){

  //The File Object
  const file = event.item(0);

  //Client-side Validation example
  if( file.type.split('/')[0] !== 'image'){
    console.error('unsupported file type : (')
    return;
  }

  // The storage path
  const path = `test/${new Date().getTime()}_${file.name}`;

  // Totally optional metadata
  const customMetadata = { app: 'Admin'};

  //The Main task
  this.task = this.storage.upload(path,file, { customMetadata });

  //Progress monitoring
  this.percentage = this.task.percentageChanges();
  this.snapshot = this.task.snapshotChanges();

  //The file's download URL
  this.task.snapshotChanges().pipe(
    finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())
  )
  .subscribe();



}

  //Determines if the upload task is active
  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }



 /*  nodes = [{
    name: 'Programming languages by programming paradigm',
    children: [{
      name: 'Object-oriented programming',
      children: [{
        name: 'Java',
      }, {
        name: 'C++',
      }, {
        name: 'C#',
      }],
    }, {
      name: 'Prototype-based programming',
      children: [{
        name: 'JavaScript',
      }, {
        name: 'CoffeeScript',
      }, {
        name: 'Lua',
      }],
    }],
  }];
 */
}
