import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { SpotType } from '../../model/barrel'
import { HttpService } from './../http.service'
import 'rxjs/Rx';

@Injectable()
export class SpotTypeService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'spottype/List?page=' + page ,{})
           .map(res => {               
               return res.json();                
           });
    }
 
    public save(item : SpotType) : Observable<any>{
        return this.http.post(environment.api + 'spottype/save' , item);
       
    }

    public delete(item : SpotType) : Observable<any>{
        return this.http.delete(environment.api + 'spottype/Delete?id=' + item.id)
        // .map(res => {
        //     return res.json();
        // });
    }
}
