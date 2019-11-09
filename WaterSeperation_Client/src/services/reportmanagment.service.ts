import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { ReportManagment, Report } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class ReportManagmentService {

    constructor(private http: HttpService, private router: Router) {

    }


    public list(page?: number | undefined): Observable<any> {
        return this.http.post(environment.api + 'reports/list?page=' + page, {})
            .map(res => {
                return res.json();
            });
    }


    public get(id?: number | undefined): Observable<any> {
        return this.http.post(environment.api + 'reports/get?id=' + id, {})
            .map(res => {
                return res.json();
            });
    }


    public getbyexecute(id?: number | undefined): Observable<any> {
        return this.http.post(environment.api + 'reports/getbyexecute?id=' + id, {})
            .map(res => {
                return res.json();
            });
    }


    public save(item: Report): Observable<any> {
        return this.http.post(environment.api + 'reports/save', item);

    }

    public delete(item: ReportManagment): Observable<any> {
        return this.http.delete(environment.api + 'reports/delete?id=' + item.id);

    }


    public execute(item: Report): Observable<any> {
        return this.http.post(environment.api + 'reports/execute', item)
            .map(res => {
                return res.json();
            });

    }


}
