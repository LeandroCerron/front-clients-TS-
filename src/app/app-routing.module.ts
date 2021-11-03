import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { GenerateUserComponent } from './components/generate-user/generate-user.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/signup/singup.component';
import {AuthGuard } from './auth.guard'
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SingupComponent},
  {path: 'editClient/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  {path: 'users', component: GenerateUserComponent, canActivate: [AuthGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
