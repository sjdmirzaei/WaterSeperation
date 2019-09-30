import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { AssignShift } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class AssignShiftService {

    constructor(private http: HttpService, private router: Router) {

    }

    public load(): Observable<any> {
        return this.http.post(environment.api + 'assignshifts/load', {})
            .map(res => {
                return res.json();
            });
    }

    public loadnonmatgin(): Observable<any> {
        return this.http.post(environment.api + 'assignshifts/loadnonmatgin', {})
            .map(res => {
                return res.json();
            });
    }

    public get(item: AssignShift): Observable<any> {
        return this.http.post(environment.api + 'assignshifts/get', item)
            .map(res => {
                return res.json();
            });
    }

    public save(item: AssignShift): Observable<any> {
        return this.http.post(environment.api + 'assignshifts/save', item);

    }

    public delete(item: AssignShift): Observable<any> {
        return this.http.delete(environment.api + 'assignshifts/delete?id=' + item.id);

    }


}
