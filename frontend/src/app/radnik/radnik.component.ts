import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyRealEstateComponent } from '../my-real-estate/my-real-estate.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {
  firstName:string;
  data;
  url:string;
  homePage:boolean=false;
  chartPage:boolean=true;
  updatePage:boolean=false;
  realEstateRequestPage:boolean=false;
  realEstateRegistrationPage:boolean=false;
  promotionPage:boolean=false;
  viewPage:boolean=false;
  offersPage:boolean=false;
  incomePage:boolean=false;
  contractPage:boolean=false;
  inboxPage:boolean=false;
  constructor(private http:HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem("dataSource"));
    this.firstName=this.data[0].firstName;
    localStorage.setItem('type', this.data[0].type);
    this.url="../../assets/uploads/users/"+this.data[0].imagePath;
  }
  charts():void{
    this.homePage=false;
    this.chartPage=true;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }
  home():void{
    this.homePage=true;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }
  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  change():void{
    localStorage.setItem('edit','korisnik');
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=true;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  realEstateRequest():void{
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=true;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  realEstateRegistration():void{
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=true;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  promotion():void{
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=true;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  view():void{
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=true;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  offers():void{
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=true;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=false;
    localStorage.removeItem('index');
    localStorage.removeItem('myRealEstate')
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }
  income():void{
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=true;
    this.contractPage=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }
  inbox(){
    this.homePage=false;
    this.chartPage=false;
    this.updatePage=false;
    this.realEstateRequestPage=false;
    this.realEstateRegistrationPage=false;
    this.promotionPage=false;
    this.viewPage=false;
    this.offersPage=false;
    this.incomePage=false;
    this.contractPage=false;
    this.inboxPage=true;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }


}
