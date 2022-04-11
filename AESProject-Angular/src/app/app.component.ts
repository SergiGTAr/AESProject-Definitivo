import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {filter} from 'rxjs/operators';
import { UserService } from './services/user.service';

declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        UserService
    ]
})
export class AppComponent implements OnInit, OnDestroy, DoCheck {
    public identity;
    location: any;
    routerSubscription: any;
    API = 'http://localhost:3200';

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit(){
        this.recallJsFuntions();
        this.identity = this.userService.identifyUser();
    }

    ngDoCheck() {
        this.identity = this.userService.identifyUser();
    }

    recallJsFuntions() {
        this.router.events
            .subscribe((event) => {
                if ( event instanceof NavigationStart ) {
                    $('.preloader').fadeIn('slow');
                }
            });
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
                $.getScript('../assets/js/custom.js');
                $('.preloader').fadeOut('slow');
                this.location = this.router.url;
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}
