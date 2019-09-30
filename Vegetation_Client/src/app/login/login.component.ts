import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'jquery-backstretch';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy , OnInit {

    public bs: any;
    public username: string;
    public password: string;
    public loginFailed: boolean;
    public lockedUser: boolean;
    constructor(private router: Router, private authService: AuthService , private route: ActivatedRoute) { }
    public goingToDashboard : boolean = false;

    login()
    {
        this.loginFailed = false;

        this.authService.login(this.username, this.password).subscribe(result => {
            
            this.router.navigateByUrl('/cpanel');
            
        },error => {

            if(error.status == 404)
                this.loginFailed = true;
        });
    }

    ngOnInit(){        
        
    }

    ngAfterViewInit() {
        $("body").addClass("account2");
        this.bs = $.backstretch(["../assets/images/gallery/login4.jpg", "../assets/images/gallery/login3.jpg", "../assets/images/gallery/login2.jpg", "../assets/images/gallery/login.jpg"], {
            fade: 600,
            duration: 4000
        });

    }

    ngOnDestroy() {
        $("body").removeClass("account2");
        this.bs.destroy();
    }

}
