import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SubsystemService } from '../../../services/subsystem.service';
import { Subsystem } from '../../../model/barrel';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    public username: string;        
    public subsystemList : Array<any>;

    constructor(private authService: AuthService, private router: Router , private _subsystemService : SubsystemService) {
        this.username = authService.getUserFullname();        
    }   

    toggleSidebar() {
        if ($("body").hasClass("sidebar-collapsed")) {
            $("body").removeClass("sidebar-collapsed");
        }
        else {
            $("body").addClass("sidebar-collapsed");
        }
    }

    openSidebar() {
        if ($("#quickview-sidebar").hasClass("open")) {
            $("#quickview-sidebar").removeClass("open");
        }
        else {
            $("#quickview-sidebar").addClass("open");
        }
    }   

    setCurrentSystem(i) {
        this.authService.setCurrentSystem(i);        
    }

    getCurrentSystem() {
        return this.authService.getCurrentSystem();        
    }

    ngOnInit() {     

        this.subsystemList = this.authService.getSubystems();        
    }

    logout() {
        this.authService.logout();    
        this.router.navigate(['/login']);
    }

}
