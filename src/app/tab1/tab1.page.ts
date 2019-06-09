import { Component, OnInit } from '@angular/core';
import { ProcessProvider } from 'src/providers/process.provider';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    providers: [ProcessProvider]
})
export class Tab1Page implements OnInit {

    uploadedFiles: Array<File>;
    isUpload: boolean;
    message_sucess: any

    constructor(public processProvider: ProcessProvider, private router: Router) { }

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
                console.log(response.result);

                this.message_sucess = response.result;
                
                if (this.message_sucess === 'Você errou o comando') {
                    let navigationExtras: NavigationExtras = {

                    };
                    this.router.navigate(['/rejected'], navigationExtras);
                } else {
                    let navigationExtras: NavigationExtras = {

                    };
                    this.router.navigate(['/accepted'], navigationExtras);
                }
            }, err => {
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
                console.log('upload feito')
                this.verify();
            }, err => {
                console.log(err);
            })
    }

}
