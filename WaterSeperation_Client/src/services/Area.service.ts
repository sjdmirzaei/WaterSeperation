import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Area } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class AreaService {

    constructor(private http: HttpService, private router: Router) {

    }
    public bindCityList(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'Area/BindCityList' ,{})
           .map(res => {               
               return res.json();            
           });
    }


    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'Area/list?page=', {page:page})
           .map(res => {               
               return res.json();            
           });
    }


    public save(item : Area) : Observable<any>{
        return this.http.post(environment.api + 'Area/save' , item);
        
    }

    public delete(item : Area) : Observable<any>{
        return this.http.delete(environment.api + 'Area/delete?id=' + item.id);
       
    }
    

}
