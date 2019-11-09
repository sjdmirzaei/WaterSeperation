import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Shift } from '../model/barrel'
import { HttpService } from './http.service'

import 'rxjs/Rx';

const httpGetOptions = {
    headers: new Headers({                
        'Access-Control-Allow-Origin' : '*'
    })    
};

@Injectable()
export class ShiftService {

    constructor(private http: HttpService, private router: Router) {

    }
    
    public getAll(page?: number | undefined): Observable<any> {
        return this.http.post(environment.api + 'shifts/List?page=' + page, {})
            .map(res => {
                return res.json();
            });
    }


    public save(shift : Shift) : Observable<any>{
        return this.http.post(environment.api + 'shifts/save' , shift);
       
    }   

    public delete(shift : Shift) : Observable<any>{
        return this.http.delete(environment.api + 'shifts/delete?id=' + shift.id);
        
    }
    

}
