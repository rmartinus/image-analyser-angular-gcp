import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'image-analyser-angular-gcp';
  selectedFile: File = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
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
        console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%';
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  }
}
