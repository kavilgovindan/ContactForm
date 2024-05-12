import { Component, Injector, OnInit } from '@angular/core';
import { Contact } from 'src/Shared/Models/contacts';
import { Router } from '@angular/router';
import { ContactsService } from 'src/Shared/Services/contacts.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  	contacts: Contact[] = [];

  	constructor(private router: Router, private contactsService: ContactsService){}
	
	async ngOnInit(): Promise<void> {
		try{
			this.contacts = await firstValueFrom(this.contactsService.getAll());
			console.log(this.contacts)
		}
		catch{
			alert("error oocured while trying to get contacts")
		}		
	}


	onAddContacts(){
		this.router.navigate(["contacts/create"])
	}
  
	editContact(id: number){
		this.router.navigate([`contacts/edit/${id}`]);
	}
}

