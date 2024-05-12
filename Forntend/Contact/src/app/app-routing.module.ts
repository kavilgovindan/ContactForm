import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'contacts'},
  {path:'contacts', component: ContactListComponent},
  {path:'contacts/create', component: ContactCreateComponent},
  {path:'contacts/edit/:contactId', component: ContactEditComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
