import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Customer } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class CustomerService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'customers/List?page=' + page ,{})
           .map(res => {               
               return res.json();            
           });
    }    

    public save(item : Customer) : Observable<any>{
        return this.http.post(environment.api + 'customers/save' , item);
        
    }

    public delete(item : Customer) : Observable<any>{
        return this.http.delete(environment.api + 'customers/Delete?id=' + item.id);
       
    }
    

}
