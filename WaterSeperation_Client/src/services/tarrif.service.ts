import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Tarrif } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';
import { TarrifCondition } from '../model/TarrifCondition';
import { TarrifConditionMargin } from '../model/TarrifConditionMargin';


@Injectable()
export class TarrifService {

    constructor(private http: HttpService, private router: Router) {

    }
    
    public getEnumlist(): Observable<any> {
        return this.http.post(environment.api + 'Tarrif/getEnumlist',{})
           .map(res => {               
               return res.json();            
           });
    }

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'Tarrif/list?page=' + page ,{})
           .map(res => {               
               return res.json();            
           });
    }

    public getConditionList(TarrifId : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'Tarrif/getConditionList?tarrifId='+TarrifId,{})
           .map(res => {               
               return res.json();            
           });
    }

    public getConditionMarginList(TarrifId : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'Tarrif/getConditionMarginList?tarrifId='+TarrifId,{})
           .map(res => {               
               return res.json();            
           });
    }

    public save(item : Tarrif) : Observable<any>{
        return this.http.post(environment.api + 'Tarrif/save' , item)  .map(res => {               
            return res.json();            
        });
    }

    public saveCondition(item : TarrifCondition) : Observable<any>{
        return this.http.post(environment.api + 'Tarrif/saveCondition' , item)
        .map(res => {               
            return res.json();            
        });
        
    }

    public saveConditionMargin(item : TarrifConditionMargin) : Observable<any>{
        return this.http.post(environment.api + 'Tarrif/saveConditionMargin' , item)
        .map(res => {               
            return res.json();            
        });
        
    }

    public delete(item : Tarrif) : Observable<any>{
        return this.http.delete(environment.api + 'Tarrif/delete?id=' + item.id);
       
    }
    
    public deleteCondition(item : TarrifCondition) : Observable<any>{
        return this.http.delete(environment.api + 'Tarrif/deleteCondition?id=' + item.id);
        
    }

    public deleteConditionMargin(item : TarrifConditionMargin) : Observable<any>{
        return this.http.delete(environment.api + 'Tarrif/deleteConditionMargin?id=' + item.id);
        
    }
}
