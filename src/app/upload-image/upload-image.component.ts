import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../shared/upload-image.service';
import { HttpEventType } from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit {
  imageUrl: string = "/assets/img/image-regular.png";
  selectedFile: File = null;

  constructor(private imageService: UploadImageService, private ng2ImgMax: Ng2ImgMaxService) {}

  ngOnInit() {
  }

  onFileSelected(file: FileList) {
    this.ng2ImgMax.compressImage(file.item(0), 0.075).subscribe(
      result => {
        this.selectedFile = result;
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.selectedFile);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

  }

  onSubmit(Caption, Image, Response) {
    this.imageService.uploadFile(Caption.value, this.selectedFile)
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%');
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
            console.log('done');
            Response.value = JSON.stringify(event.body);
            Caption.value = null;
            Image.value = null;
            this.imageUrl = "/assets/img/image-regular.png";
          }
        }
      );
  }
}
