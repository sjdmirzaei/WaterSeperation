import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Parking, ParkingOwner, ParkingType, ParkingUsageType, ActivityScope } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';


@Injectable()
export class ParkingService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAllBaseInfo(): Observable<any> {
        return this.http.post(environment.api + 'parkings/GetAllParkingBaseInfo', {})
            .map(res => {
                return res.json();
            });
    }

    public getAll(page?: number | undefined): Observable<any>{
        return this.http.post(environment.api + 'parkings/List?page=' + page, {})
            .map(res => {
                return res.json();
            });
    }

    public save(item: Parking): Observable<any> {
      
        item.ParkingOwnerId=+item.owner.id;
        item.ParkingTypeId=+item.type.id;
        item.ParkingUsageTypeId=+item.usageType.id;
        item.ActivityScopeId=+item.scope.id;
        return this.http.post(environment.api + 'parkings/Save', item);
           
    }

    public delete(item: Parking): Observable<any> {
        return this.http.delete(environment.api + 'parkings/Delete?id=' + item.id)
    
    }

}
