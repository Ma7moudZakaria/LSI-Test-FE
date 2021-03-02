import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../../interfaces/attachments-interfaces/file-upload';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private http: HttpClient) { }
  UploadFilesURL =environment.BaseURL+"Attachments/upload-file";
  getAttachmentId=environment.BaseURL+"Attachments/download-file/";
  deleteAttachmentId=environment.BaseURL+"Attachments/delete-file/";
  
  upload(files:FileUpload[]) {

    var fd = new FormData();
    let i =0;
    Array.from(files).forEach((file) => {
      var x = 'attachmentsModel['+i+'].ContainerNameIndex';
      fd.append('attachmentsModel['+i+'].ContainerNameIndex', file.containerNameIndex.toString());
      fd.append('attachmentsModel['+i+'].File', file.file);
      i++;
    });
    return this.http.post(this.UploadFilesURL,fd)
  }
   
  getFile(filesIds:Array<string>){
    return this.http.post(this.getAttachmentId, filesIds);
  }
  
  removeFile(fileId:string){
    return this.http.delete(this.deleteAttachmentId+fileId);
  }
}
