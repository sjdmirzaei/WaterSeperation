import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

import * as screenfull from 'screenfull';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SubsystemService } from '../../../services/subsystem.service';
import { Menu } from '../../../model/barrel';


@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit, OnDestroy {

    @Output() showSearch = new EventEmitter<any>();
    public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
    public username: string;
    public menuList: Array<any>;

    public roles: Array<any>;
    public currentRole: any;

    constructor(private mScrollbarService: MalihuScrollbarService, private authService: AuthService, private router: Router, private subsystemService: SubsystemService) {

        this.username = authService.getUserFullname();

        this.roles = this.authService.getRoles();
        this.currentRole = this.authService.getCurrentRoleObject();

        this.menuList = this.authService.getMenus();

    }

    selectRole(role: number) {
        this.currentRole = this.roles[role];
        this.authService.setCurrentRole(role);
    }

    showMorphSearch() {
        this.showSearch.emit();
    }

    fullscreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }

    ngAfterViewInit() {
        this.mScrollbarService.initScrollbar('#scrt', { theme: 'light-thick', autoHideScrollbar: true });

        this.authService.subsystemChanged.subscribe(rec => {

            this.menuList = this.authService.getMenus();

        });
    }

    showChilds(id) {

        if ($("#menu" + id).hasClass("active"))
            $("#menu" + id).removeClass("active");
        else
            $("#menu" + id).addClass("active");
    }

    ngOnDestroy() {
        this.mScrollbarService.destroy('#scrt');
    }

    lock() {
        this.authService.lock();
        this.router.navigate(['/lock']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }


    getCurrentSystem() {
        return this.authService.getCurrentSystem();
    }

}
