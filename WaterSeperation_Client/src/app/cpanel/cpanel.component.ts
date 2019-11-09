import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { LoaderComponent } from '../blocks/loader/loader.component';
import { MorphsearchComponent } from '../blocks/morphsearch/morphsearch.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { unescapeIdentifier } from '@angular/compiler';


@Component({
    templateUrl: './cpanel.component.html',
    styleUrls: ['./cpanel.component.css']
})

export class CpanelComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(LoaderComponent) loader;
    @ViewChild(MorphsearchComponent) search;

    public header: string = "";
    public subsystem: string = undefined;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {

        this.showPageHeader();

        this.authService.subsystemChanged.subscribe(rec => {

            // var res = {...this.authService.getCurrentSystemObj()};
            // this.subsystem = res ? res.title : undefined;

        });

    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    ngAfterViewInit(): void {



        this.loader.hide();

        document.querySelector('.page-content').addEventListener('click', function (ev) {
            var chatSidebar = document.getElementById('quickview-sidebar');
            var target = ev.target;
            if (target !== chatSidebar) {
                if ($('#quickview-sidebar').hasClass('open')) {
                    $('#quickview-sidebar').addClass('closing');
                    $('#quickview-sidebar').removeClass('open');
                    setTimeout(function () {
                        $('#quickview-sidebar').removeClass('closing');
                    }, 400);
                }
            }
        });

    }

    showMorphSearch() {
        this.search.show();
    }

    showPageHeader() {
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['status']) {
                        return child.snapshot.data['header'];
                    } else {
                        return null;
                    }
                }
                return null;
            }).subscribe((customData: any) => {
                this.header = customData;
            });
    }

}
