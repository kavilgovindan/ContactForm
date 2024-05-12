import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateRequest } from '../Models/authenticateRequest';
import { AuthenticateResponse } from '../Models/authenticateResponse';
import { AppUser } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL: string = "https://localhost:7190/api/";

  constructor(private http: HttpClient) { }

  Authenticate(request : AuthenticateRequest){
    this.http.post<AuthenticateResponse>(this.apiURL+'Users/authenticate', request);
  }

  get(){
    this.http.get<AppUser[]>(this.apiURL+'Users');
  }
}
