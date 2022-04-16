import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location, PopStateEvent } from '@angular/common';
import { User } from './_models/user/user';
import { AccountService } from './_services/account.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { ViewChild, AfterViewInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor( public location: Location, private router: Router, public accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
    console.log(this.router)
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function

          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(elemMainPanel);
          ps = new PerfectScrollbar(elemSidebar);
      }
  }
  ngAfterViewInit() {
      this.runOnRouteChange();
  }
  isRoute(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice(2);
      if(path == titlee){
          return true;
      }
      else {
          return false;
      }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

    setCurrentUser(){
      const user : User = JSON.parse(localStorage.getItem('user'));
      this.accountService.setCurrentUser(user);
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
}
