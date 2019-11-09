import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Holiday } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class HolidayService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'holidays/list' ,{page:page})
         .map(res => {               
               return res.json();            
           });
    }


    public save(item : Holiday) : Observable<any>{
        return this.http.post(environment.api + 'holidays/save' , item);
        
    }

    public delete(item : Holiday) : Observable<any>{
        return this.http.delete(environment.api + 'holidays/delete?id=' + item.id);
       
    }
    

}
