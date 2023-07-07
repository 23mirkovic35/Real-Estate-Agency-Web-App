import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  days:any;
  message:string;
  passwordChange:boolean;
  static i:number;
  type:string;
  arrayOfUsernames:any[]=[];
  arrayOfEmails:any[]=[];
  //Info o korisniku kojeg menjamo
  data:any;
  idUser:number;
  firstNameUser:string;
  lastNameUser:string;
  usernameUser:string;
  passwordUser:string;
  emailUser:string;
  cityUser:string;
  countryUser:string;
  imagePathUser:string;
  url:string;
  images;
  // boolean-i za checkbox-ove
  changeFirstNameUser:boolean;
  changeLastNameUser:boolean;
  changeUsernameUser:boolean;
  changeEmailUser:boolean;
  changeCityUser:boolean;
  changeCountryUser:boolean;
  //
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  constructor(private http:HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.http.post<any>('http://localhost:3000/checkUsername',null).subscribe(
      (res) =>{
        if(res.find){
          this.arrayOfUsernames=res.array;
          console.log(this.arrayOfUsernames)
        }
      },
      (err)=>console.log(err)
    );
    this.http.post<any>('http://localhost:3000/checkEmail',null).subscribe(
      (res) =>{
        if(res.find){
          this.arrayOfEmails=res.array;
          console.log(this.arrayOfEmails)
          for(let i=0;i<this.arrayOfEmails.length;i++){
            console.log(this.emailUser +' ' + this.arrayOfEmails[i].email)
          }
        }
      },
      (err)=>console.log(err)
    );
    ProfileUpdateComponent.i=0;
    if(localStorage.getItem('edit')=='admin' || localStorage.getItem('edit')=='korisnik'|| localStorage.getItem('edit')=='radnik'){
      this.data=JSON.parse(localStorage.getItem("dataSource"));
      console.log(this.data)
      this.idUser=this.data[0].id;
      this.firstNameUser=this.data[0].firstName;
      this.lastNameUser=this.data[0].lastName;
      this.usernameUser=this.data[0].username;
      this.passwordUser=this.data[0].password;
      this.emailUser=this.data[0].email;
      this.cityUser=this.data[0].city;
      this.countryUser=this.data[0].country;
      this.imagePathUser=this.data[0].imagePath;
      this.url="../../assets/uploads/users/" + this.imagePathUser;
    }else{
      this.data=JSON.parse(localStorage.getItem("data"));
      localStorage.removeItem('data')
      this.idUser=this.data.idUser;
      this.firstNameUser=this.data.firstNameUser;
      this.lastNameUser=this.data.lastNameUser;
      this.usernameUser=this.data.usernameUser;
      this.passwordUser=this.data.passwordUser;
      this.emailUser=this.data.emailUser;
      this.cityUser=this.data.cityUser;
      this.countryUser=this.data.countryUser;
      this.imagePathUser=this.data.imagePathUser;
      this.url="../../assets/uploads/users/" + this.imagePathUser;
    }
  }
  checkUsername(username):boolean{
    for(let i=0; i<this.arrayOfUsernames.length;i++){
      if(username==this.arrayOfUsernames[i].username)return true;
    }
    return false;
  }
  setPassword():void{
    ProfileUpdateComponent.i++;
    this.oldPassword="";
    this.newPassword="";
    this.confirmPassword="";
    if(ProfileUpdateComponent.i%2==1){
      this.passwordChange=true;
    }
    else {
      this.message="";
      this.passwordChange=false;
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
  checkEmail(email):boolean{
    for(let i=0;i<this.arrayOfEmails.length;i++){
      if(this.emailUser==this.arrayOfEmails[i].email)return true;
    }
    return false;
  }
  changeFunction():void{
    if(this.firstNameUser=="" || this.firstNameUser==null || this.firstNameUser==undefined){
      this.message='*Molimo Vas da unesete vaše ime!';
    }else if(this.lastNameUser=="" || this.lastNameUser==null || this.lastNameUser==undefined){
      this.message='*Molimo Vas da unesete vaše prezime!';
    }else if(this.usernameUser=="" || this.usernameUser==null || this.usernameUser==undefined){
      this.message='*Molimo Vas da unesete vaše korisničko ime!';
    }else if(this.emailUser=="" || this.emailUser==null || this.emailUser==undefined){
      this.message='*Molimo Vas da unesete vašu e-mail adresu!';
    }else if(this.cityUser=="" || this.cityUser==null || this.cityUser==undefined){
      this.message='*Molimo Vas da unesete vaš grad!';
    }else if(this.countryUser=="" || this.countryUser==null || this.countryUser==undefined){
      this.message='*Molimo Vas da unesete vašu državu!';
    }else if(ProfileUpdateComponent.i%2==1 && (this.oldPassword=="" || this.oldPassword==null || this.oldPassword==undefined)){
      this.message='*Molimo Vas da unesete vašu staru lozinku!';
    }else if(ProfileUpdateComponent.i%2==1 && this.oldPassword!=this.passwordUser){
      this.message='*Niste uneli vašu staru lozinku!';
    }else if(this.changeUsernameUser==true && this.checkUsername(this.usernameUser)){
      this.message='*Korisničko ime je već zauzeto!';
    }else if(this.changeEmailUser==true && this.checkEmail(this.emailUser)){
      this.message='*E-mail adresa je već zauzeta!';
    }else if(ProfileUpdateComponent.i%2==1 && (this.oldPassword=="" || this.newPassword=="" || this.confirmPassword=="")){
      if(this.newPassword=="" || this.newPassword==null || this.newPassword==undefined){
        this.message='*Molimo Vas da unesete vašu novu lozinku!';
      }else if(this.newPassword.length<8){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da ima najmanje 8 karaktera.';
      }else if(this.newPassword.length>24){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da ima najvise 24 karaktera.';
      }else if(!this.testPasswordNumber(this.newPassword)){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedan broj.';
      }else if(!this.testPasswordSmallLetter(this.newPassword)){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedano malo slovo.';
      }else if(!this.testPasswordBigLetter(this.newPassword)){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedano veliko slovo.';
      }else if(!this.testPasswordSpecialCharacters(this.newPassword)){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka mora da sadrži najmanje jedan specijalan karakter.';
      }else if(this.testPasswordThreeLettertInRow(this.newPassword)){
        this.message='*Uneta lozinka nije u dobrom formatu! Lozinka ne sme da sarži tri uzastopna ista karaktera.';
      }else if(this.oldPassword==this.newPassword){
        this.message='*Stara i nova lozinka ne smeju da budu iste';
      }else if(this.confirmPassword=="" || this.confirmPassword==null || this.confirmPassword==undefined){
        this.message='*Molimo Vas da potvrdite vašu novu lozinku!';
      }
    }else if(ProfileUpdateComponent.i%2==1 && this.newPassword!=this.confirmPassword){
      this.message='*Molimo Vas unesite istu lozinku kod potvrde nove lozinke';
    }else if(!this.testEmail(this.emailUser)){
      this.message="Uneta e-mail adresa nije u dobrom formatu!";
    }else{
      console.log(this.newPassword + " "+ this.confirmPassword)
      if(ProfileUpdateComponent.i%2==1) this.passwordUser=this.newPassword;
      const formData=new FormData();
      formData.append('file',this.images);
      console.log(formData)
      this.http.post<any>('http://localhost:3000/updateUser/'+this.idUser+'/'+this.firstNameUser+'/'+this.lastNameUser+'/'+this.usernameUser+'/'+this.passwordUser+'/'+this.emailUser+'/'+this.cityUser+'/'+this.countryUser,formData).subscribe(
          (res) => {
            if(res.err=="ERROR1"){
              this.message="*Korisnicko ime ili e-mail adresa su zauzeti";
            }
            else if(res.err=="ERROR"){
              this.message="*Greska u sistemu";
            }
            else if(res.update){ 
              if(localStorage.getItem('edit')!='user'){
                /*this.data[0].firstName=this.firstNameUser;
                this.data[0].lastName=this.lastNameUser;
                this.data[0].username=this.usernameUser;
                this.data[0].email=this.emailUser;
                this.data[0].city=this.cityUser;
                this.data[0].country=this.countryUser;
                this.data[0].password=this.passwordUser;
                if(this.images!=null){
                  this.data[0].imagePath=this.images.name;
                }
                localStorage.removeItem('dataSource');
                localStorage.setItem('dataSource',JSON.stringify(this.data));*/
                this.message='*Podaci su uspešno promenjeni!'
                this.logout();
              }else{
                localStorage.removeItem('edit')
                this.message='*Podaci su uspešno promenjeni!'
                window.location.reload();
              }
            }
          },
          (err)=>console.log(err)
      );
  
    }
  }
  testEmail(email:string):boolean{
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
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
  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
