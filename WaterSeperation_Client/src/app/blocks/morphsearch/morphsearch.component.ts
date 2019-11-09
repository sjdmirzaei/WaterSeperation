import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-morphsearch',
    templateUrl: './morphsearch.component.html',
    styleUrls: ['./morphsearch.component.css']
})
export class MorphsearchComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    show() {
        $("#morphsearch").addClass("open");
        $('body').addClass('ov-hidden');
        $('.page-content').css('display', '');
        setTimeout(function () {
            $('.morphsearch-input').focus();

        }, 200);
    }

    hide() {
        $("#morphsearch").removeClass("open");
        $('body').removeClass('ov-hidden');
        $('.page-content').css('display', 'block');
    }

}
