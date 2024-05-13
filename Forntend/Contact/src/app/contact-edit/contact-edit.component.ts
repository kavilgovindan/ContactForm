import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Contact } from 'src/Shared/Models/contacts';
import { ContactsService } from 'src/Shared/Services/contacts.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    address: this.fb.control(''),
    city:this.fb.control(''),
    country: this.fb.control(''),
    email: this.fb.control(''),
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    phoneNumber: this.fb.control(''),
    postalCode: this.fb.control(''),
    state: this.fb.control('')    
  });
  private contact: Contact ;
  private contactId: number = 0;
  
  constructor(private fb: FormBuilder, private contactsService:ContactsService, private router: ActivatedRoute ){}

  async ngOnInit(): Promise<void> {
    const contactid = this.router.snapshot.paramMap.get('contactId') ;
    this.contactId = contactid == null ? 0 : parseInt(contactid)
    this.contact = await firstValueFrom(this.contactsService.read(this.contactId));  
    this.form.patchValue({
      ...this.contact
    });

  }

  async onSubmit(){
    try{
      var value = this.form.value
      var result =  await firstValueFrom(this.contactsService.update(this.contactId,{
        id : this.contactId,
        ...value
      }));
  
      alert('The Contact was created successfully.');
    }
    catch (err){
      console.error(err);
      alert('An error occurred while creating the patient.');
    }
    
  }
}
