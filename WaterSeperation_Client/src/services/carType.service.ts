import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { CarType } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class CarTypeService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'carType/list?page=' + page ,{})
           .map(res => {               
               return res.json();            
           });
    }


    public save(item : CarType) : Observable<any>{
        return this.http.post(environment.api + 'carType/save' , item);
        
    }

    public delete(item : CarType) : Observable<any>{
        return this.http.delete(environment.api + 'carType/delete?id=' + item.id);
       
    }
    

}
