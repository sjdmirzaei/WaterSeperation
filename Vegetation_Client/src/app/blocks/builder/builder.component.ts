import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
    selector: 'app-builder',
    templateUrl: './builder.component.html',
    styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

    public Colors : Array<any>;    
    public BgColors : Array<any>;    
    public currentColor : number = 0;
    public currentBgColor : number = 0;

    constructor() { 

        this.Colors = [
            { name : "default" , color : "#2B2E33" , class : "bg-dark" },
            { name : "primary" , color : "#319DB5" , class : "background-primary"},
            { name : "red" ,     color : "#C75757" , class : "bg-red"},
            { name : "green" ,   color : "#1DA079" , class : "bg-green"},
            { name : "orange" ,  color : "#D28857" , class : "bg-orange"},
            { name : "purple" ,  color : "#B179D7" , class : "bg-purple"},
            { name : "blue" ,    color : "#4A89DC" , class : "bg-blue"}
        ];

        this.BgColors = [
            {name : 'clean' , color : '#F8F8F8'},
            {name : 'lighter' , color : '#EFEFEF'},
            {name : 'light-default' , color : '#E9E9E9'},
            {name : 'light-blue' , color : '#E2EBEF'},
            {name : 'light-purple' , color : '#E9ECF5'},
            {name : 'light-dark' , color : '#DCE1E4'}            
        ];

    }    

    ngOnInit() {

        this.changeColor(0);

    }

    toggle() {
        if ($("#builder").hasClass("open")) {
            $("#builder").removeClass("open");
        }
        else {
            $("#builder").addClass("open");
        }
    }


    toggleTopbar() {
        if ($('body').hasClass('fixed-topbar'))
            $('body').removeClass('fixed-topbar');
        else
            $('body').removeClass('fixed-topbar').addClass('fixed-topbar');
    }

    toggleSidebar() {
        if ($('body').hasClass('fixed-sidebar')) {
            $('body').removeClass('fixed-sidebar');
        }
        else {
            $('body').removeClass('fixed-sidebar').addClass('fixed-sidebar');
            $('.sidebar').height('');
        }
    }

    changeTheme(theme)
    {
        if(!theme)
            theme = "sdtl";

        $('.theme').removeClass('active');

        $('.theme.' + theme).addClass('active');
        $('body').removeClass(function (index, css) {
            return (css.match(/(^|\s)theme-\S+/g) || []).join(' ');
        });
        $('body').addClass('theme-' + theme);        
    }

    ChangeBgColor(i){

        var bgColor = this.BgColors[i];     
        this.currentBgColor = i;   

        $('body').removeClass(function (index, css) {
            return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
        });
        $('body').addClass('bg-' + bgColor.name);

    }

    changeColor(i) {

        var color = this.Colors[i];    
        this.currentColor = i;    

        $('body').removeClass(function (index, css) {
            return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
        });               
                
        $('body').addClass('color-' + color.name);        

        if (color.name == 'default') {
            $('.theme-left').css('background-color', '#202226');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393E44');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#fff');
            $('.sltl .theme-left').css('background-color', '#fff');
        }
        if (color.name == 'primary') {
            $('.theme-left').css('background-color', '#319DB5');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#164954');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#DDE6E9');
        }
        if (color.name == 'red') {
            $('.theme-left').css('background-color', '#C9625F');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#4E3232');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F3F1');
        }
        if (color.name == 'green') {
            $('.theme-left').css('background-color', '#18A689');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#24392E');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F1F8F3');
        }
        if (color.name == 'orange') {
            $('.theme-left').css('background-color', '#C58627');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#50361F');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F8F4F1');
        }
        if (color.name == 'purple') {
            $('.theme-left').css('background-color', '#6E62B5');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#393F51');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F3F2F7');
        }
        if (color.name == 'blue') {
            $('.theme-left').css('background-color', '#4A89DC');
            $('.theme-sidebar-dark, .theme-right-dark').css('background-color', '#1E3948');
            $('.theme-sidebar-light, .theme-right-light').css('background-color', '#F2F4F7');
        }

        
        this.changeTheme(undefined);            
        
    }


}
