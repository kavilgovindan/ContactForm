import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ContactsService } from 'src/Shared/Services/contacts.service';

// interface createContactForm{
//   FirstName: FormControl<string>;
//   LastName: FormControl<string>;
//   Email: FormControl<string>;
//   PhoneNumber: FormControl<string>;
//   Address: FormControl<string>;
//   City: FormControl<string>;
//   State: FormControl<string>;
//   Country: FormControl<string>;
//   PostalCode: FormControl<string>;
// }

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})


export class ContactCreateComponent {

  public form: FormGroup = this.fb.group({
    Address: this.fb.control(''),
    City:this.fb.control(''),
    Country: this.fb.control(''),
    Email: this.fb.control(''),
    FirstName: this.fb.control(''),
    LastName: this.fb.control(''),
    PhoneNumber: this.fb.control(''),
    PostalCode: this.fb.control(''),
    State: this.fb.control('')    
  });

  constructor(private fb: FormBuilder, private contactsService:ContactsService ){

  }

  async onSubmit(){
    try{
      var value = this.form.value
      var result =  await firstValueFrom(this.contactsService.create({
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
