import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message:string;
  homeButtonShow:boolean=true;
  basicUser:boolean=true;
  basicUserAdmin:boolean;
  workerAdmin:boolean;
  firstName:string;
  lastName:string;
  username:string;
  password: string;
  confirmPassword:string;
  email:string;
  city:string;
  country:string;
  url:string;
  images;
  constructor(private router:Router,private http:HttpClient, private form:FormBuilder) {}

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("HomeButton"))==null)
      this.homeButtonShow=true;
    else {
      localStorage.removeItem('HomeButton');
      this.homeButtonShow=false;
    }
    if(localStorage.getItem('userSignUpAdmin')!=null){
      localStorage.removeItem('userSignUpAdmin');
      this.basicUserAdmin=true;
      this.basicUser=false;
      this.workerAdmin=false;
    }else if(localStorage.getItem('workerSignUpAdmin')!=null){
      localStorage.removeItem('workerSignUpAdmin');
      this.basicUserAdmin=false;
      this.basicUser=false;
      this.workerAdmin=true;
    }else {
      this.basicUserAdmin=false;
      this.basicUser=true;
      this.workerAdmin=false;
    }
    
  }
  homePage():void{
    this.router.navigateByUrl('/');
  }
  login():void{
    this.router.navigateByUrl('/login');
  }
  testEmail(email:string):boolean{
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(this.email);
  }
  testPasswordNumber(password:string):boolean{
    const reg=/[0-9]/;
    return reg.test(password); 
  }
  testPasswordSmallLetter(password:string):boolean{
    const reg=/[a-z]/;
    return reg.test(password);
  }
  testPasswordBigLetter(password:string):boolean{
    const reg=/[A-Z]/;
    return reg.test(password);
  }
  testPasswordSpecialCharacters(password:string):boolean{
    const reg=/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    return reg.test(password);
  }
  testPasswordThreeLettertInRow(password:string):boolean{
    const reg=/(.)\1\1/;
    return reg.test(password);
  }
  signup(number:number):void{
    console.log(number);
    if(this.firstName=="" || this.firstName==null || this.firstName==undefined){
      this.message='*Molimo Vas da unesete vaše ime!';
    }else if(this.lastName=="" || this.lastName==null || this.lastName==undefined){
      this.message='*Molimo Vas da unesete vaše prezime!';
    }else if(this.username=="" || this.username==null || this.username==undefined){
      this.message='*Molimo Vas da unesete vaše korisničko ime!';
    }else if(this.city=="" || this.city==null || this.city==undefined){
      this.message='*Molimo Vas da unesete vaš grad!';
    }else if(this.country=="" || this.country==null || this.country==undefined){
      this.message='*Molimo Vas da unesete vašu državu!';
    }else if(this.email=="" || this.email==null || this.email==undefined){
      this.message='*Molimo Vas da unesete vašu e-mail adresu!';
    }else if(this.testEmail(this.email)==false){
      this.message='*Uneta e-mail adresa nije u odgovarajućem formatu!';
    }else if(this.password=="" || this.password==null || this.password==undefined){
      this.message='*Molimo Vas da unesete vašu lozinku!';
    }else if(this.password.length<8){
      this.message='*Uneta lozinka nije u dobrom formatu! Minimalan broj karaktera u lozinci je 8.';
    }else if(this.password.length>24){
      this.message='*Uneta lozinka nije u dobrom formatu! Maksimalan broj karaktera u lozinci je 24.';
    }else if(this.testPasswordNumber(this.password)==false){
      this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedan broj.';
    }else if(this.testPasswordSmallLetter(this.password)==false){
      this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedan malo slovo.';
    }else if(this.testPasswordBigLetter(this.password)==false){
      this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedan veliko slovo.';
    }else if(this.testPasswordSpecialCharacters(this.password)==false){
      this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedan specijalan karakter.';
    }else if(this.testPasswordThreeLettertInRow(this.password)==true){
      this.message='*Uneta lozinka nije u dobrom formatu! Lozinka ne sme da sarži tri uzastopna ista karaktera.';
    }else if(this.confirmPassword=="" || this.confirmPassword == undefined || this.confirmPassword == null){
      this.message='*Molimo Vas potvrdite vašu lozinku!';
    }else if(this.password!=this.confirmPassword){
      this.message='*Unete lozinke nisu iste!';
    }else{
      const formData=new FormData();
      formData.append('file',this.images);
      this.http.post<any>('http://localhost:3000/singup/'+this.firstName+'/'+this.lastName+'/'+this.username+'/'+this.password+'/'+this.email+'/'+this.city+'/'+this.country+'/'+number,formData).subscribe(
        (res) =>{
          if(res.err=="ERROR1"){
            this.message="*Korisnicko ime ili e-mail adresa su zauzeti";
          }
          if(res.err=="ERROR"){
            this.message="*Greska u sistemu";
          }
          if(res.insert && this.basicUser==true){
            this.message="*Zahtev je poslat, molimo Vas sačekajte da administrator odobri nalog.";
          }
        },
        (err)=>console.log(err)
      );
    }
  }


  onSelectFile(e){
    if(e.target.files){
      const file=e.target.files[0];
      this.images=file;
      const reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
}
