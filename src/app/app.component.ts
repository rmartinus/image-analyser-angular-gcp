import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'image-analyser-angular-gcp';
  selectedFile: File;
  http: HttpClient;

  constructor(private http: HttpClient) {
    this.http = http
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post('https://my-image-analyser.appspot.com/v1/analyse', uploadData,  {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      console.log(event); // handle event here
    });
  }
}
