import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Car } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class CarService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'cars/List?page=' + page ,{})
           .map(res => {               
               return res.json();            
           });
    }  

    public bindCustomerList(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'cars/BindCustomerList' ,{})
           .map(res => {               
               return res.json();            
           });
    }

    public save(item : Car) : Observable<any>{
        return this.http.post(environment.api + 'cars/save' , item);
       
    }

    

}
