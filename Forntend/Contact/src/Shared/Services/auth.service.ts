import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private route: Router) {
    this.isAuthenticated = this.isLoggedIn();
  }

  isLoggedIn() {
    let token = window.localStorage.getItem('authToken');
    if(token != null || token != undefined){
      return true;
    }
    return false;
  }

  logOut(){
    window.localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.route.navigate(['login']);
  }

}
