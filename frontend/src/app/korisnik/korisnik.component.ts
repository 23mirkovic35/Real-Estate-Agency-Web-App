import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyRealEstateComponent } from '../my-real-estate/my-real-estate.component';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {
  data:any;
  type:string="korisnik";
  firstName:string;
  url:string;
  homebutton:boolean=true;
  updateUser:boolean;
  registration:boolean;
  myRE:boolean;
  inboxPage:boolean;
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    localStorage.setItem('type',this.type)
    this.data=JSON.parse(localStorage.getItem("dataSource"));
    this.firstName=this.data[0].firstName;
    this.url='../../assets/uploads/users/'+this.data[0].imagePath;
    console.log(this.data)
    console.log(this.url);
  }

  update():void{
    this.registration=false;
    this.homebutton=false;
    this.updateUser=true;
    this.myRE=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
    localStorage.setItem('edit','korisnik')
  }

  home():void{
    this.registration=false;
    this.homebutton=true;
    this.updateUser=false;
    this.myRE=false;
    this.inboxPage=false;
    window.location.reload();
  }

  signUp():void{
    this.myRE=false;
    this.registration=true;
    this.homebutton=false;
    this.updateUser=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  myRealEstate():void{
    this.myRE=true;
    this.registration=false;
    this.homebutton=false;
    this.updateUser=false;
    this.inboxPage=false;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  showInbox(){
    this.myRE=false;
    this.registration=false;
    this.homebutton=false;
    this.updateUser=false;
    this.inboxPage=true;
    MyRealEstateComponent.updateRE=false;
    MyRealEstateComponent.offerRE=false;
  }

  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
