import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import {SearchRegisterDocument, Transaction } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class RegisterdocumentService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll( item: SearchRegisterDocument ): Observable<any> {
        return this.http.post(environment.api + 'registerdocuments/list', item)
           .map(res => {               
               return res.json();            
           });
    }

    public save(item: number[]) : Observable<any>{
        return this.http.post(environment.api + 'registerdocuments/save' , item);
        
    }


 
    

}
