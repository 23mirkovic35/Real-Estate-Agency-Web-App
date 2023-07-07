import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { RadnikComponent } from './radnik/radnik.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { RealEstateRegistrationComponent } from './real-estate-registration/real-estate-registration.component';
import { RealEstateRequirementsComponent } from './real-estate-requirements/real-estate-requirements.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './charts/charts.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ViewRealEstateComponent } from './view-real-estate/view-real-estate.component';
import { RealEstateInfoComponent } from './real-estate-info/real-estate-info.component';
import { MyRealEstateComponent } from './my-real-estate/my-real-estate.component';
import { RealEstateUpdateComponent } from './real-estate-update/real-estate-update.component';
import { RealEstateOfferComponent } from './real-estate-offer/real-estate-offer.component';
import { RealEstateIncomeComponent } from './real-estate-income/real-estate-income.component';
import { ContactComponent } from './contact/contact.component';
import { InboxComponent } from './inbox/inbox.component';
import { SetPercentageComponent } from './set-percentage/set-percentage.component';
import { NewMessageComponent } from './new-message/new-message.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminComponent,
    KorisnikComponent,
    RadnikComponent,
    ProfileUpdateComponent,
    RealEstateRegistrationComponent,
    RealEstateRequirementsComponent,
    ChartsComponent,
    PromotionComponent,
    ViewRealEstateComponent,
    RealEstateInfoComponent,
    MyRealEstateComponent,
    RealEstateUpdateComponent,
    RealEstateOfferComponent,
    RealEstateIncomeComponent,
    ContactComponent,
    InboxComponent,
    SetPercentageComponent,
    NewMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
