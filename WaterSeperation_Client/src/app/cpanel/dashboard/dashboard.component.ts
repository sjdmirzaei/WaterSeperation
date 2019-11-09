import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , AfterViewInit {


    constructor(private authService: AuthService) {         
    }

    ngOnInit() {
    }

    ngAfterViewInit() { 
        this.authService.subsystemChanged.emit(this.authService.getCurrentSystem());
    }

}
