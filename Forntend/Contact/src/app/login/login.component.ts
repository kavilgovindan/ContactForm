import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthenticateRequest } from 'src/Shared/Models/authenticateRequest';
import { AuthService } from 'src/Shared/Services/auth.service';
import { UsersService } from 'src/Shared/Services/users.service';

interface login{
  username: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form: FormGroup<login> = this.fb.group({
    username:new FormControl('',Validators.required),
    password: new FormControl('' ,Validators.required)
  });
  constructor(private fb: FormBuilder ,private usersService: UsersService, private router: Router, private authService: AuthService){}
  async onSubmit(){
    let authRequest = this.form.value;
    try{
      var user = await firstValueFrom(this.usersService.Authenticate(authRequest));
      if(user != null){
        window.localStorage.setItem('authToken', user.token);
        this.authService.isAuthenticated =true ;
        this.router.navigate(['']);
      }
    }
    catch{
      alert("username/password is wrong")
    }
    
  }
}
