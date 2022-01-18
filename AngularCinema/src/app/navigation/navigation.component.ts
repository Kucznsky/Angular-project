import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd   } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent{
 private path: string='';
 get Path(): string { return this.path }
  constructor(private router: Router) {
    this.router.events.subscribe(
      next => { 
        if (next instanceof NavigationEnd)
        {
          this.path=this.router.url;
          // console.log("p: ",this.router.url)
        } 
      }
    )
  }
}
