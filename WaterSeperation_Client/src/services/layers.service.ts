import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Layer, Subsystem } from '../model/barrel'
import { HttpService } from './http.service'
import 'rxjs/Rx';


@Injectable()
export class LayerService {

    constructor(private http: HttpService, private router: Router) {

    }

    public getAll(page?: number | undefined): Observable<any>{
        return this.http.post(environment.api + 'leyers/List?page=' + page, {})
            .map(res => {
                return res.json();
            });
    }

    public getSubSystemLayers(subSystemId: number): Observable<any> {
        return this.http.post(environment.api + "Leyers/GetSubSystemLeyers?subSystemId=" + subSystemId ,{})
         .map(res => {
            return res.json();
          });
    }

    public save(item: Layer): Observable<any> {
        item.name = item.title;
        item.visible = true;
        item.subsystem = '3';
        return this.http.post(environment.api + 'leyers/Save', item);
    }

    public delete(item: Layer): Observable<any> {
        return this.http.delete(environment.api + 'leyers/Delete?id=' + item.id)
    }

}
