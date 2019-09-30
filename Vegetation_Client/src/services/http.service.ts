import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { JSONP_HOME } from '@angular/http/src/backends/browser_jsonp';
import { AuthService } from './auth.service';


@Injectable()
export class HttpService {

    private token :string;

    constructor(private http: Http) {

        this.token = 'bearer ' + localStorage.getItem('token');

    }    
    
    public post(url : string, data : any) {

        let headers = new Headers();
        headers.append('Authorization', this.token);

        return this.http.post(url , data , {
            headers: headers
        });
            
    }

    public get(url : string, data : any) {

        let headers = new Headers();
        headers.append('Authorization',  this.token);

        return this.http.get(url ,{
            headers: headers
        });
            
    }

    public delete(url : string) {

        let headers = new Headers();
        headers.append('Authorization',  this.token);

        return this.http.delete(url ,{
            headers: headers
        });
    }

 


}
