import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Storage } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class StorageService {

    constructor(private http: HttpService, private router: Router) {

    }
   


    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'storages/list?page=', {page:page})
           .map(res => {               
               return res.json();            
           });
    }


    public save(item : Storage) : Observable<any>{
        return this.http.post(environment.api + 'storages/save' , item);
        
    }

    public delete(item : Storage) : Observable<any>{
        return this.http.delete(environment.api + 'storages/delete?id=' + item.id);
       
    }
    

}
