import { Injectable } from "@angular/core";
import { Http, Headers, Response, Jsonp } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";
import { Layer } from "../model/barrel";
import { HttpService } from "./http.service";

import "rxjs/Rx";

const httpGetOptions = {
  headers: new Headers({
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable()
export class LeyerService {
  constructor(private http: HttpService, private router: Router) {}

  public getAll(page?: number | undefined): Observable<any> {
    return this.http
      .get(environment.api + "leyers/list", { page: page })
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

  public save(menu: Layer): Observable<any> {
    return this.http.post(environment.api + "leyers/save", menu);
  }

  public delete(menu: Layer): Observable<any> {
    return this.http.delete(environment.api + "leyers/delete/" + menu.id);
  }
}
