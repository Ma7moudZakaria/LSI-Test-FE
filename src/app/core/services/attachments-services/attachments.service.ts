import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAttachment } from '../../interfaces/attachments-interfaces/iattachment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private http: HttpClient) { }
  UploadFilesURL =environment.BaseURL+"Attachments/upload-file";
  getAttachmentId=environment.BaseURL+"Attachments/download-file/";
  deleteAttachmentId=environment.BaseURL+"Attachments/delete-file/";
  
  upload(files:IAttachment[]) {

    const fd = new FormData();
    Array.from(files).forEach((file) => {
      fd.append('attachmentsModel'+[0]+'ContainerNameIndex', file.containerNameIndex.toString());
      fd.append('attachmentsModel'+[0]+'File', file.file);

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
