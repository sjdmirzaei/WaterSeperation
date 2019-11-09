import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { ReportGroup } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';

@Injectable()
export class ReportGroupService {

    constructor(private http: HttpService, private router: Router) {

    }


    public list(page?: number | undefined): Observable<any> {
        return this.http.post(environment.api + 'reportgroups/list?page=' + page, {})
            .map(res => {
                return res.json();
            });
    }

    public save(item: ReportGroup): Observable<any> {
        return this.http.post(environment.api + 'reportgroups/save', item);

    }

    public delete(item: ReportGroup): Observable<any> {
        return this.http.delete(environment.api + 'reportgroups/delete?id=' + item.id);

    }


}
