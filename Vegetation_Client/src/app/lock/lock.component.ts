import { Component, OnInit , AfterViewInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import 'jquery-backstretch';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-lock',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.css']
})
export class LockComponent implements  AfterViewInit, OnDestroy {

    public bs: any;
    public username : string;
    public fullname : string;
    public password : string;
    public loginFailed : boolean;

    constructor(private router: Router , private authService : AuthService) { 

        this.fullname = localStorage.getItem("fullname");
        this.username = localStorage.getItem("username");

    }
    
    login() {

        this.loginFailed = false;

        this.authService.login(this.username, this.password).subscribe(result => {
            
            this.router.navigateByUrl('/cpanel');
            
        },error => {

            if(error.status == 404)
                this.loginFailed = true;
        });

    }

    ngAfterViewInit() {

        $("body").addClass("account");
        this.bs = $.backstretch(["../assets/images/gallery/login4.jpg", "../assets/images/gallery/login3.jpg", "../assets/images/gallery/login2.jpg", "../assets/images/gallery/login.jpg"], {
            fade: 600,
            duration: 4000
        });

    }

    ngOnDestroy() {
        $("body").removeClass("account");
        this.bs.destroy();
    }


}
