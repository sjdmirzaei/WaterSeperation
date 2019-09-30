import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router , private authService : AuthService) { }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            
            return true;
        }         
        this.router.navigate(['/login']);
        return false;
    }

}
