import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  settings:boolean;
  requirements:boolean;
  userChange:boolean;
  changing:boolean;
  signupUser:boolean;
  signupWorker:boolean;
  signUpRE:boolean;
  charts:boolean;
  requirementsRE:boolean;
  firstName:string;
  url:string;
  data;
  arrayOfRequirements:any[];
  arrayOfAcceptedUsers:any[];
  arrayOfSrc:any[];
  contactPage: boolean;
  percentagePage: boolean;

  constructor(private router:Router,private http:HttpClient, private form:FormBuilder) {}

  ngOnInit(): void {
    this.settings=false;
    this.data=JSON.parse(localStorage.getItem("dataSource"));
    this.firstName=this.data[0].firstName;
    localStorage.setItem('type', this.data[0].type);
    this.url="../../assets/uploads/users/"+this.data[0].imagePath;
  }
  home():void{
    this.router.navigateByUrl('/');
  }
  setSettings():void{
    this.requirements=false;
    this.settings=true;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
    localStorage.setItem('edit','admin');
  }
  setRequirements():void{
    this.requirements=true;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
    const data={
     firstName: this.firstName
    };
    this.http.post<any>('http://localhost:3000/admin', data).subscribe(
      (res) =>{
        if(res.login){
          //localStorage.setItem('dataSource', JSON.stringify(res.arrayOfUsers) );
          this.arrayOfRequirements=res.arrayOfUsers;
          console.log(this.arrayOfRequirements)

          this.arrayOfSrc = new  Array<string>(this.arrayOfRequirements.length);
          for(let i = 0; i<this.arrayOfRequirements.length; i++){

            if(this.arrayOfRequirements[i].imagePath!="noImage.png"){
              //alert("../../assets/uploads/"+this.arrayOfRequirements[i].imagePath)
              this.arrayOfSrc.push("../../assets/uploads/users/"+this.arrayOfRequirements[i].imagePath)
            }else{
              //alert("../../assets/defaultImage/noImage.png")
              this.arrayOfSrc.push("../../assets/uploads/users/noImage.png")
            }
          }
        }
      },
      (err)=>console.log(err)
    );
  }
  setChange():void{
    this.requirements=false;
    this.settings=false;
    this.userChange=true;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
    const data={
      firstName: this.firstName
    };
    this.http.post<any>('http://localhost:3000/change', data).subscribe(
      (res) =>{
        if(res.login){
          //localStorage.setItem('dataSource', JSON.stringify(res.arrayOfUsers) );
          this.arrayOfAcceptedUsers=res.arrayOfUsers;
          console.log(this.arrayOfAcceptedUsers)

          this.arrayOfSrc = new  Array<string>(this.arrayOfAcceptedUsers.length);
          for(let i = 0; i<this.arrayOfAcceptedUsers.length; i++){
            if(this.arrayOfAcceptedUsers[i].imagePath!="noImage.png"){
              //alert("../../assets/uploads/"+this.arrayOfRequirements[i].imagePath)
              this.arrayOfSrc.push("../../assets/uploads/users/"+this.arrayOfAcceptedUsers[i].imagePath)
            }else{
              //alert("../../assets/defaultImage/noImage.png")
              this.arrayOfSrc.push("../../assets/uploads/users/noImage.png")
            }
          }
        }
      },
      (err)=>console.log(err)
    );
  }

  singUpUser():void{
    localStorage.setItem('HomeButton', JSON.stringify(false));
    localStorage.setItem('userSignUpAdmin', JSON.stringify(true));
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=true;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
  }

  signUpWorker():void{
    localStorage.setItem('HomeButton', JSON.stringify(false));
    localStorage.setItem('workerSignUpAdmin', JSON.stringify(true));
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=true;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
  }

  logout():void{
    localStorage.removeItem('dataSource');
    localStorage.removeItem('type');
    this.router.navigateByUrl('/login');
  }
  refuseRequirements(username:string):void{
    const data={
      user:username
     };
    console.log(data.user);
    this.http.post<any>('http://localhost:3000/delete/'+data.user, data).subscribe(
        (res) =>{
          if(res.delete==true){           
            this.arrayOfRequirements.forEach((elem, index)=>{
              if(elem.username == username){
                this.arrayOfRequirements.splice(index,1);
              }
            })

            this.ngOnInit();
          }
        },
        (err)=>console.log(err)
      );
  }
  acceptRequirements(username:string):void{
    const data={
      user:username
     };
    console.log(data.user);
    this.http.post<any>('http://localhost:3000/accept/'+data.user, data).subscribe(
        (res) =>{
          if(res.accept==true){
            this.arrayOfRequirements.forEach((elem, index)=>{
              if(elem.username == username){
                this.arrayOfRequirements.splice(index,1);
              }
            })

            this.ngOnInit();
          }
        },
        (err)=>console.log(err)
      );
  }
  deleteUser(username:string){
    this.http.post<any>('http://localhost:3000/delete/'+username, username).subscribe(
        (res) => {
          if(res.delete==true){
            this.arrayOfAcceptedUsers.forEach((elem, index)=>{
              if(elem.username == username){
                this.arrayOfAcceptedUsers.splice(index,1);
              }
            })

            this.ngOnInit();
          }
        },
        (err)=>console.log(err)
      );
  }
  changeUser(username:string):void{
    for(let i=0;i<this.arrayOfAcceptedUsers.length;i++){
      if(this.arrayOfAcceptedUsers[i].username==username){
        const data={
          firstNameUser:this.arrayOfAcceptedUsers[i].firstName,
          lastNameUser:this.arrayOfAcceptedUsers[i].lastName,
          usernameUser:this.arrayOfAcceptedUsers[i].username,
          passwordUser:this.arrayOfAcceptedUsers[i].password,
          idUser:this.arrayOfAcceptedUsers[i].id,
          emailUser:this.arrayOfAcceptedUsers[i].email,
          cityUser:this.arrayOfAcceptedUsers[i].city,
          countryUser:this.arrayOfAcceptedUsers[i].country,
          imagePathUser:this.arrayOfAcceptedUsers[i].imagePath
        };
        localStorage.setItem('data', JSON.stringify(data));
        break;
      }
    }
    //this.url="../../assets/uploads/" + this.imagePathUser;
    //console.log(this.firstNameUser + "" + this.lastNameUser+ "" +this.usernameUser+ "" +this.emailUser+ "" +this.cityUser+ "" +this.countryUser)
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=true;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
    localStorage.setItem('edit', 'user');
  }

  signUpRealEstate():void{
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.requirementsRE=false;
    this.signUpRE=true;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
  }
  requirementsRealEstate():void{
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=true;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=false;
  }

  showCharts():void{
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=true;
    this.contactPage=false;
    this.percentagePage=false;
  }

  contracts(){
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=true;
    this.percentagePage=false;
  }
  percentage(){
    this.requirements=false;
    this.settings=false;
    this.userChange=false;
    this.changing=false;
    this.signupUser=false;
    this.signupWorker=false;
    this.signUpRE=false;
    this.requirementsRE=false;
    this.charts=false;
    this.contactPage=false;
    this.percentagePage=true;
  }

}

