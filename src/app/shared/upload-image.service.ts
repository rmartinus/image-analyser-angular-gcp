import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadImageService {

  constructor(private http: HttpClient) { }

  uploadFile(caption: string, selectedFile: File) {
    const endpoint = 'https://my-image-analyser.appspot.com/v1/analyse';
    const uploadData = new FormData();
    uploadData.append('caption', caption);
    uploadData.append('image', selectedFile, selectedFile.name);

    return this.http.post(endpoint, uploadData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
