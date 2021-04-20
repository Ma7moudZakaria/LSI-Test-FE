import { Component, Input, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { IDragDropAccordionItems } from 'src/app/core/interfaces/shared-interfaces/accordion-interfaces/idrag-drop-accordion-items';
import { ITelInputParams } from 'src/app/core/interfaces/shared-interfaces/tel-input-interfaces/itel-input-params';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';

export interface DragDropListItem {
  id: string;
  title: string;
  // description: string;
}
@Component({
  selector: 'app-shared-material',
  templateUrl: './shared-material.component.html',
  styleUrls: ['./shared-material.component.scss']
})
export class SharedMaterialComponent implements OnInit {
  checked: boolean = false;
  indeterminate: boolean = false;
  // labelPosition: 'before' | 'after' = 'after';
  disabled: boolean = false;
  panelOpenState: boolean = false;
  pp = '222222';
  telInputParam : ITelInputParams = {
    // phoneNumber:'+201062100486',
    isRequired : true,
    countryIsoCode: '{"initialCountry": "sa"}'
  }
//===========recrd=================
//Lets initiate Record OBJ
 record:any;
//Will use this flag for detect recording
 recording = false;
//Url of Blob
 url:any;
 error:any;
 ejazaAttachmentIds: string[] = [];
 fileList: IAttachment[] = [];
 fileUploadModel: IFileUpload[] = [];
 resMessage: BaseMessageModel = {};
//===========end record===============
  constructor(public dialog: MatDialog,public domSanitizer: DomSanitizer,private attachmentService: AttachmentsService,) { }

  ngOnInit(): void {
  }

  unassignedTasks: DragDropListItem[] = [
    {
      id: '1',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from'
      // description: 'This is description of tasks 1'
    },
    {
      id: '2',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from'
      // description: 'This is description of tasks 2'
    },
    {
      id: '3',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      // description: 'This is description of tasks 3'
    }
  ];

  assignedTasks = [
    {
      id: '4',
      title: 'Task 4',
      // description: 'This is description of tasks 4'
    },
    {
      id: '5',
      title: 'Task 5',
      // description: 'This is description of tasks 5'
    },
    {
      id: '6',
      title: 'Task 6',
      // description: 'This is description of tasks 6'
    }
  ];

  drop(event: CdkDragDrop<DragDropListItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

/*
 * custome pop-up 
 */
  result: string = '';
  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

  /*
 * custome card
 */

 cardLst = [
   {title: 'title ABC', content:'content ABC', imgPath:'../../../assets/images/book.svg'},
   {title: 'title CDE', content:'content CDE', imgPath:'../../../assets/images/mic.svg'},
   {title: 'title EFG', content:'content EFG', imgPath:'../../../assets/images/book.svg'}
 ]

 /*
  * custome accordion 
  */

 items: IDragDropAccordionItems[] = [
  {
    id: '1',
    title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
    paragraph : "test test test test test test test test test test test test test test test test test test test test "
    // description: 'This is description of tasks 1'
  },
  {
    id: '2',
    title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
    paragraph : "test341 test341 test341 test341 test341 test341 test341 test341 test341 test341 "
    // description: 'This is description of tasks 2'
  },
  {
    id: '3',
    title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
    paragraph : "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
    // description: 'This is description of tasks 3'
  },
  {
    id: '4',
    title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
    paragraph : "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
    // description: 'This is description of tasks 3'
  },
  {
    id: '5',
    title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
    paragraph : "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
    // description: 'This is description of tasks 3'
  },
  {
    id: '6',
    title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
    paragraph : "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
    // description: 'This is description of tasks 3'
  }
];


hasError(event:any){
  console.log(event);
}

getNumber(event:any){
  console.log(event);
}

telInputObject(event:any){
  console.log(event);
}

onCountryChange(event:any){
  console.log(event);
}

savePhonNumber(event:any){
  this.telInputParam.phoneNumber =event ;
}

// ===========record=========
sanitize(url:string){
  return this.domSanitizer.bypassSecurityTrustUrl(url);
}
/**
* Start recording.
*/
initiateRecording() {

  this.recording = true;
  let mediaConstraints = {
      video: false,
      audio: true
  };
  navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
}
    /**
     * Will be called automatically.
     */
     successCallback(stream:any) {
      var options = {
          mimeType: "audio/wav",
          numberOfAudioChannels: 1
      };
      //Start Actuall Recording
      var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
      this.record = new StereoAudioRecorder(stream, options);
      this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
      this.recording = false;
      this.record.stop(this.processRecording.bind(this));
  }
    /**
     * processRecording Do what ever you want with blob
     * @param  {any} blob Blog
     */
     processRecording(blob:any) {
      // this.url = URL.createObjectURL(blob);
      // this.onEjazaFileChange(blob);


      // const formData = new FormData();
      //  formData.append('file', blob);
      //  this. UploadFiles(formData);
     //  this. UploadFiles(blob);

     let files = Array<IFileUpload>();
     files.push({
       containerNameIndex : 1,
       file: blob
     })
     this.UploadFiles(files)
  }
  /**
   * Process Error.
   */
  errorCallback(error:any) {
      this.error = 'Can not play audio in your browser';
  }

  // onEjazaFileChange(files: FileList) {
  //   if (files.length > 0) {
  //     Array.from(files).forEach(element => {
  //       var fileUploadObj: IFileUpload = {
  //         containerNameIndex: 1, // need to be changed based on file type
  //         file: element

  //       }
  //       this.fileUploadModel.push(fileUploadObj)
  //     });
  //     this.UploadFiles(this.fileUploadModel);
  //   }

  // }

  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.ejazaAttachmentIds.push(elm.id);
          this.fileList.push(elm);
          this.url =elm.url ;
        })
        this.fileUploadModel = [];
      }, error => {
        console.log(error);
        this.fileUploadModel = [];
        this.resMessage = 
        {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        } 
      }
    )
  }
// =========end record===========

}

