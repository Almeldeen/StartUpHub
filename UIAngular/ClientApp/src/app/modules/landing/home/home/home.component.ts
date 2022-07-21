import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicRoutes } from 'app/shared/routes/public-routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goLogin(){
    this.route.navigate( ['/', PublicRoutes.login])
  }
  goSignUp(){
    this.route.navigate( ['/', PublicRoutes.signUp])
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

}
