import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import * as RecordRTC from 'recordrtc';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';

@Component({
  selector: 'app-voice-recording',
  templateUrl: './voice-recording.component.html',
  styleUrls: ['./voice-recording.component.scss']
})
export class VoiceRecordingComponent implements OnInit {

  @Output() getVoiceUrl = new EventEmitter<string>();
  record: any;
  recording = false;
  url: any;
  error: any;
  voiceNoteAttachmentIds: string[] = [];
  fileList: IAttachment[] = [];
  fileUploadModel: IFileUpload[] = [];
  resMessage: BaseMessageModel = {};
  //===========end record===============

  constructor(public domSanitizer: DomSanitizer, private attachmentService: AttachmentsService) { }

  ngOnInit(): void {
  }

  sanitize(url: string) {
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
  successCallback(stream: any) {
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
  processRecording(blob: any) {
    let files = Array<IFileUpload>();
    files.push({
      containerNameIndex: 1,
      file: blob
    })
    this.UploadFiles(files)
  }
  /**
   * Process Error.
   */
  errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
  }
  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        Array.from(res.data).forEach((elm: any) => {
          this.voiceNoteAttachmentIds.push(elm.id);
          this.fileList.push(elm);
          this.url = elm.url;

          this.getVoiceUrl.emit(this.url);
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

}
