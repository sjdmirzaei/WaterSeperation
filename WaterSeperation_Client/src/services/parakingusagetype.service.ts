import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { ParkingUsageType } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class ParkingUsageTypeService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'parkingusagetype/List?page=' + page ,{})
           .map(res => {               
               return res.json();                
           });
    }
 
    public save(item : ParkingUsageType) : Observable<any>{
        return this.http.post(environment.api + 'parkingusagetype/save' , item);
        
    }

    public delete(item : ParkingUsageType) : Observable<any>{
        return this.http.delete(environment.api + 'parkingusagetype/Delete?id=' + item.id)
       
    }
    

}
