import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    Address: this.fb.control('', Validators.required),
    City:this.fb.control('', Validators.required),
    Country: this.fb.control('', Validators.required),
    Email: this.fb.control('', [Validators.required, Validators.email]),
    FirstName: this.fb.control('',Validators.required),
    LastName: this.fb.control('',Validators.required),
    PhoneNumber: this.fb.control('',  Validators.required),
    PostalCode: this.fb.control('',  Validators.required),
    State: this.fb.control('',  Validators.required)    
  });

  constructor(private fb: FormBuilder, private contactsService:ContactsService ){

  }

  async onSubmit(){
    try{
      if(this.form.invalid){
        return alert('invalid');
      }
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
