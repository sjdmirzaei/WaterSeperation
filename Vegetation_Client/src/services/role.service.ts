import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Role } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class RoleService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page? : number | undefined):  Observable<any> {
        return this.http.post(environment.api + 'roles/list?page=',  {page:page})
           .map(res => {               
               return res.json();                
           });
    }

    public save(role : Role) :  Observable<any>{
        return this.http.post(environment.api + 'roles/save' , role);
    }
      

    public delete(item : Role) : Observable<any>{
        return this.http.delete(environment.api + 'roles/delete?id=' + item.id);
    }
    

}
