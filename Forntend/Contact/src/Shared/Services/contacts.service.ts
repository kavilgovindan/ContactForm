import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiURL: string = "https://localhost:7190/api/";

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Contact[]>(this.apiURL+'Contacts');
  }

  read(id: number){
    return this.http.get<Contact>(this.apiURL+`Contacts/${id}`);
  }

  create(contact: Contact){
    return this.http.post<Contact>(this.apiURL+'Contacts',contact);
  }

  update(id: number, contact: Contact){
    return this.http.put<Contact>(this.apiURL+`Contacts/${id}`, contact);
  }

  delete(id: number){
    return this.http.delete<void>(this.apiURL+`Contacts/${id}`);
  }
}
