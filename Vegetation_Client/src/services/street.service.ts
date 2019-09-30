import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { JSONP_HOME } from '@angular/http/src/backends/browser_jsonp';
import { Router } from '@angular/router';
import { Street } from '../model/barrel'
import { HttpService } from './http.service'

import 'rxjs/Rx';

const httpGetOptions = {
    headers: new Headers({                
        'Access-Control-Allow-Origin' : '*'
    })//,
    //withCredentials: true
};

@Injectable()
export class StreetService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page? : number | undefined):  Observable<any> {
        return this.http.post(environment.api + 'streets/List', {page:page})
           .map(res => {               
               return res.json();                
           });
    }

   

    public save(street : Street) : Observable<any>{
        return this.http.post(environment.api + 'streets/save' , street);
       
    }

   

    public delete(street : Street) : Observable<any>{
        return this.http.delete(environment.api + 'streets/delete?id=' + street.id);
       
    }
    

}
