import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { CpanelModule } from './cpanel/cpanel.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { environment } from '../environments/environment';

import * as $ from 'jquery';
import { LockComponent } from './lock/lock.component';
import { AuthService } from '../services/auth.service';
import { LeyerService } from '../services/leyer.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LockComponent              
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,        
        BrowserAnimationsModule,
        CpanelModule,
        HttpModule,
        FormsModule,
        MalihuScrollbarModule.forRoot(),
        NgxCaptchaModule
    ],
    providers: [
        AuthService,
        LeyerService,
        AuthGuard          
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
