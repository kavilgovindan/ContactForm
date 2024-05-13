import { Component } from '@angular/core';
import { AuthService } from 'src/Shared/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private authService: AuthService){}

  logOut() {
    this.authService.logOut();
  }
}


