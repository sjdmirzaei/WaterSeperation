import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { City } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class CityService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'City/List?page=' + page ,{})
           .map(res => {               
               return res.json();            
           });
    }

    public getBind(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'City/getBind?page=',{page:page})
           .map(res => {               
               return res.json();            
           });
    }


    public bindRegionList(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'City/BindRegionList' ,{})
           .map(res => {               
               return res.json();            
           });
    }

    public save(item : City) : Observable<any>{
        return this.http.post(environment.api + 'City/save' , item);
        
    }

    public delete(item : City) : Observable<any>{
        return this.http.delete(environment.api + 'City/Delete?id=' + item.id);
       
    }
    

}
