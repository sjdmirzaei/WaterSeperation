import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { JSONP_HOME } from '@angular/http/src/backends/browser_jsonp';
import { Router } from '@angular/router';
import { Parkingcar,ListParkingcar } from '../model/barrel'
import { HttpService } from './http.service'

import 'rxjs/Rx';

const httpGetOptions = {
    headers: new Headers({                
        'Access-Control-Allow-Origin' : '*'
    })//,
    //withCredentials: true
};

@Injectable()
export class ParkingcarService  {

    constructor(private http: HttpService, private router: Router) {

    }


    public save(item : Parkingcar) : Observable<any>
    {
        return this.http.post(environment.api + 'parkingCars/save' ,item)
        .map(res => {               
            return res.json();                
        });
       
    }

    public savecharge(item : Parkingcar) : Observable<any>
    {
        return this.http.post(environment.api + 'parkingCars/savecharge' ,item)
        .map(res => {               
            return res.json();                
        });
       
    }


    public exitCar(item : ListParkingcar) : Observable<any>
    {
        return this.http.post(environment.api + 'parkingCars/exitCar' ,item);
       
       
    }


    public getAll(item : Parkingcar):  Observable<any> {
        return this.http.post(environment.api + 'parkingCars/List',item)
           .map(res => {               
               return res.json();                
           });
    }

   

    

}
