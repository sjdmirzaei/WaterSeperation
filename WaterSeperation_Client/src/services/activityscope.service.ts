import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { ActivityScope } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class ActivityScopeService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'activityscope/List?page=' + page ,{})
           .map(res => {               
               return res.json();                
           });
    }
 
    public save(item : ActivityScope) : Observable<any>{
        return this.http.post(environment.api + 'activityscope/save' , item);
        
    }

    public delete(item : ActivityScope) : Observable<any>{
        return this.http.delete(environment.api + 'activityscope/Delete?id=' + item.id);
       
    }
    

}
