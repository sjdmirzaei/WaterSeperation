import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Region } from '../../model/barrel'
import { HttpService } from './../http.service'
import 'rxjs/Rx';

@Injectable()
export class RegionService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'Region/List?page=' + page ,{})
           .map(res => {               
               return res.json();                
           });
    }
 
    public save(item : Region) : Observable<any>{
        return this.http.post(environment.api + 'Region/save' , item);
       
    }

    public delete(item : Region) : Observable<any>{
        return this.http.delete(environment.api + 'Region/Delete?id=' + item.id)
        // .map(res => {
        //     return res.json();
        // });
    }
}
