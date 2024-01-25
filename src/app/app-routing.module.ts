import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';

const routes: Routes = [
  {path:'log-in', title:'log-in',component:LoginComponent},
  {path:'sign-up', title:'sign-up',component:SignupComponent},
  {path:'home', title:'home',component:HomeComponent},
  {path:'acceuil', title:'acceuil',component:AcceuilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
