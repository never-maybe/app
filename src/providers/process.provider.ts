import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProcessProvider {

    constructor(public http: HttpClient) { }

    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private processURL = "http://localhost:3001";


    verify(): Observable<Object> {
        return this.http.get(this.processURL + "/api/verify")
            .pipe(
                (res => res)
            );
    }

    uploadDocument(formData) {
        return this.http.post(this.processURL + '/api/upload', formData)
            .pipe(
                (res => res)
            );
    }

    
}
