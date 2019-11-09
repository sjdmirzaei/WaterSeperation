import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Discount } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class DiscountService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'discounts/list',{page:page})
        .map(res => {               
               return res.json();            
           });
    }


    public save(item : Discount) : Observable<any>{
        return this.http.post(environment.api + 'discounts/save' , item);
        
    }

    public delete(item : Discount) : Observable<any>{
        return this.http.delete(environment.api + 'discounts/delete?id=' + item.id);
       
    }
    

}
