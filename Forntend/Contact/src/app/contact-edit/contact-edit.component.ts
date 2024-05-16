import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    address: this.fb.control('', Validators.required),
    city:this.fb.control('', Validators.required),
    country: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    phoneNumber: this.fb.control('', Validators.required),
    postalCode: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required)    
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
      if(this.form.invalid){
        return alert('from invalid');
      }
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
