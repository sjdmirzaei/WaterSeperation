import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";
import 'rxjs/add/operator/map'

import 'rxjs/Rx';
import { ElectronService } from './electron.service';

@Injectable()
export class DeviceService {
    private ipc: IpcRenderer;

    constructor(private electronSrv : ElectronService) {
        
        if(electronSrv.isElectronApp())
            this.ipc = electronSrv.getIpcRenderer();

    }


    readCard() {
        return new Promise<string>((resolve, reject) => {

          this.ipc.send("startDeviceToRead", (event, arg) => {            
            resolve(arg);
          });
          
        });
      }


}
