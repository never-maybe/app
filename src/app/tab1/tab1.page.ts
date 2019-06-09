import { Component, OnInit } from '@angular/core';
import { ProcessProvider } from 'src/providers/process.provider';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ProcessProvider]
})
export class Tab1Page implements OnInit{

  uploadedFiles: Array<File>;
  isUpload: boolean;

  constructor( public processProvider: ProcessProvider) {}

  public ngOnInit() {

  }
  fileChange(element) {
    this.isUpload = true;
    this.uploadedFiles = element.target.files;
}

verify() {
    this.processProvider.verify()
    .subscribe(res => {
        let response = res as any;
        alert(response.result);
    }, err=> {
        console.log(err);
    })
}

upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    this.processProvider.uploadDocument(formData)
        .subscribe(res => {
            alert("okay");
        }, err => {
            console.log(err);
        })
}

}
