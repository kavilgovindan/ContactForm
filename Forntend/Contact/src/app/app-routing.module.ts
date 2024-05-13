import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from 'src/Shared/AuthGuards/auth-guard.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'contacts'},
  {path: 'login', component: LoginComponent},
  {path:'contacts', component: ContactListComponent , canActivate:[AuthGuardService]},
  {path:'contacts/create', component: ContactCreateComponent, canActivate:[AuthGuardService]},
  {path:'contacts/edit/:contactId', component: ContactEditComponent, canActivate:[AuthGuardService]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
