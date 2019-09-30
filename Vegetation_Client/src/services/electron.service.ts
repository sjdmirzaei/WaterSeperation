import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";
import 'rxjs/add/operator/map'

import 'rxjs/Rx';

@Injectable()
export class ElectronService {
    
    
    private _isElectronApp : boolean;

    constructor() {
        if ((<any>window).require) {

            try {

                this._isElectronApp = (<any>window).require("electron").ipcRenderer ? true : false;

            } catch (error) {

                this._isElectronApp = false;
                
            }
        } else {

            this._isElectronApp = false;

        }
    }

    isElectronApp() {
            return this._isElectronApp;      
    }

    getIpcRenderer() : IpcRenderer{
        return (<any>window).require("electron").ipcRenderer;
    }

}
