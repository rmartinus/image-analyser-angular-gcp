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
    this.ng2ImgMax.resizeImage(file.item(0), 10000, 300).subscribe(
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

  onSubmit(Caption, Image, Hashtags) {
    this.imageService.uploadFile(Caption.value, this.selectedFile)
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%');
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
            console.log('done');
            var hashTags = this.generateHashTags(event.body);
            Hashtags.value = hashTags;
            Caption.value = null;
            Image.value = null;
            this.imageUrl = "/assets/img/image-regular.png";
          }
        }
      );
  }

  generateHashTags(obj): string {
    var sortable=[];
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        sortable.push(['#' + key.replace(/ /g,''), obj[key]]);
      }
    }
    sortable.sort((a, b) => {
      return b[1]-a[1];
    });

    var hashTags = "";
    for (var i in sortable) {
      hashTags += sortable[i][0] + " ";
    }
    return hashTags;
	}
}
