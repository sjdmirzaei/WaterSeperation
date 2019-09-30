import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Spot, IrrigationMethod, SpotType, Region, Treaty, VegetationType } from '../../model/barrel'
import { HttpService } from './../http.service'
import 'rxjs/Rx';


@Injectable()
export class SpotService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAllBaseInfo(): Observable<any> {
        return this.http.post(environment.api + 'spot/GetAllSpotBaseInfo', {})
            .map(res => {
                return res.json();
            });
    }

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'spot/List?page=' + page ,{})
           .map(res => {               
               return res.json();                
           });
    }
 
    public save(item : Spot) : Observable<any>{
        return this.http.post(environment.api + 'spot/save' , item);
       
    }

    public delete(item : Spot) : Observable<any>{
        return this.http.delete(environment.api + 'spot/Delete?id=' + item.id)
        // .map(res => {
        //     return res.json();
        // });
    }
}
