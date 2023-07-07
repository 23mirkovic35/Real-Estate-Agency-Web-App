import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { LoginComponent } from './login/login.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { RadnikComponent } from './radnik/radnik.component';
import { RealEstateRegistrationComponent } from './real-estate-registration/real-estate-registration.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"admin", component:AdminComponent},
  {path:"korisnik", component:KorisnikComponent},
  {path:"radnik", component:RadnikComponent},
  {path:"update", component:ProfileUpdateComponent},
  {path:"realEstateRegistration", component:RealEstateRegistrationComponent},
  {path:"home", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
