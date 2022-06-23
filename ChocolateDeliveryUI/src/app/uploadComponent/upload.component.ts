import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  progress: number = 0;
  message: string = "";
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  uploadFile = (files : any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.userService.upload(formData, {reportProgress: true, observe: 'events'}).subscribe
    (
      {
        next: (event) => 
        {
          if (event.type === HttpEventType.UploadProgress && event.total != undefined)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      }
    );
  }
}