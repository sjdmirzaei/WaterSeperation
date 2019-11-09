import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response, Jsonp, } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { JSONP_HOME } from '@angular/http/src/backends/browser_jsonp';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import 'rxjs/Rx';
import { Subsystem } from '../model/barrel';
import { SubsystemService } from './subsystem.service';

const httpPostOptions = {
    headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    })//,
    //withCredentials: true
};

const httpGetOptions = {
    headers: new Headers({
        'Access-Control-Allow-Origin': '*'
    })//,
    //withCredentials: true
};

@Injectable()
export class AuthService {


    @Output() subsystemChanged = new EventEmitter();
    @Output() roleChanged = new EventEmitter();

    private subsystems: Array<Subsystem>;

    constructor(private http: Http, private router: Router, private _subsystemService: SubsystemService) {

    }

    public login(username: string, password: string): Observable<any> {

        return this.http.post(environment.api + 'auth/token', { username: username, password: password }).map((res: Response) => {
            localStorage.setItem('token', res.json().token);
            localStorage.setItem('authData', JSON.stringify(res.json().data));
            var currentData=  JSON.parse(localStorage.getItem('authData'));
            localStorage.setItem('currentRole', currentData[0].id);
            localStorage.setItem('currentSystem', currentData[0].subsystems[0].id);


        });
    }

    private getTokenInfo(): any {        
        return jwt_decode(localStorage.getItem('token'));
    }

    private getToken()
    {
        return localStorage.getItem('token');
    }

    private getAuthData () : any
    {
        
        return JSON.parse(localStorage.getItem('authData'));
    }
    

    public lock() {

        var username = this.getTokenInfo().Username;
        var fullname = this.getTokenInfo().FullName;

        localStorage.setItem('fullname', fullname);
        localStorage.setItem('username', username);

        localStorage.removeItem('token');

    }

    isAuthenticated() {
        return localStorage.getItem('token') ? true : false;
    }    

    getCurrentRole(){
        return parseInt(localStorage.getItem('currentRole'));       
    }    

    getCurrentRoleObject(){
        return this.getRoles()[this.getCurrentRole()];
    }  

    setCurrentRole(role : number){
        localStorage.setItem('currentRole' , role.toString());
        this.roleChanged.emit(role);
        this.setCurrentSystem(1);
    }

    getRoles(){
        return this.getAuthData();
    }


    getUserFullname(): string {
        return this.getTokenInfo().FullName;
    }

    setCurrentSystem(system: number) {
        localStorage.setItem('currentSystem', system.toString());
        this.subsystemChanged.emit(system);
    }

    getCurrentSystem(): number {
        return parseInt(localStorage.getItem('currentSystem'));
    }
   
    getSubystems(): Array<any> {        
        return this.getRoles()[this.getCurrentRole()].subsystems;
    }

    getCurrentSubsystemObject(){
        return this.getSubystems()[this.getCurrentSystem()];
    }  

    getMenus(): Array<any> {     
        return this.getRoles()[this.getCurrentRole()].subsystems[this.getCurrentSystem()].menus;
    }

 

    logout(): void {

        localStorage.removeItem('token');

    }

}
