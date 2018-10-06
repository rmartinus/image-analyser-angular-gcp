import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  imageUrl : string = "/assets/img/image-regular.png";
  selectedFile : File = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  onFileSelected(file : FileList) {
    this.selectedFile = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post('https://my-image-analyser.appspot.com/v1/analyse', uploadData,  {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%');
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  }
}
