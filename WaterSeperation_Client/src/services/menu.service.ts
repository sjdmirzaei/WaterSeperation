import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Menu } from '../model/barrel'
import { HttpService } from './http.service'

import 'rxjs/Rx';

const httpGetOptions = {
    headers: new Headers({                
        'Access-Control-Allow-Origin' : '*'
    })    
};

@Injectable()
export class MenuService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined):  Observable<any> {
        return this.http.post(environment.api + 'menu/list' ,{page:page})
           .map(res => {               
               return res.json();                
           });
    }

    public save(menu : Menu) : Observable<any>{
        return this.http.post(environment.api + 'menu/save' , menu);
       
    }

   

    public delete(menu : Menu) : Observable<any>{
        return this.http.delete(environment.api + 'menu/delete?id=' + menu.id);
        
    }
    

}
