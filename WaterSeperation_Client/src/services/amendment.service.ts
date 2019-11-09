import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Amendment } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class AmendmentService {

    constructor(private http: HttpService, private router: Router) {

    }
    

    public getAll(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'amendments/List?page=' + page ,{})
           .map(res => {               
               return res.json();            
           });
    }  
    
    public bindPelakLetterList(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'amendments/BindPelakLetterList' ,{})
           .map(res => {               
               return res.json();            
           });
    }
    
    public bindTransactionTypeEditableList(page? : number | undefined): Observable<any> {
        return this.http.post(environment.api + 'amendments/BindTransactionTypeEditableList' ,{})
           .map(res => {               
               return res.json();            
           });
    }

    public save(item : Amendment) : Observable<any>{
        return this.http.post(environment.api + 'amendments/save' , item);
        
    }

    public delete(item : Amendment) : Observable<any>{
        return this.http.delete(environment.api + 'amendments/Delete?id=' + item.id);
       
    }
    

}
