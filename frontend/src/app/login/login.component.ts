import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  message:string;
  type:string;
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }

  homePage():void{
    this.router.navigateByUrl('/');
  }
  signup():void{
    this.router.navigateByUrl('/signup');
  }
  login():void{
    if(this.username=="" || this.username==null || this.username==undefined){
      this.message='*Molimo Vas da unesete vaše korisničko ime!';
    }else if(this.password=="" || this.password==null || this.password==undefined){
      this.message='*Molimo Vas da unesete vašu lozinku!';
    }else if(this.type==""||this.type==null||this.type==undefined){
      this.message='*Molimo Vas izaberite tip korisnika sistema!';
    }else{
      const data={
        username:this.username,
        password:this.password,
        type:this.type
      };
      this.http.post<any>('http://localhost:3000/login', data).subscribe(
        (res) =>{
          if(res.err=="ERROR"){
            this.message="*Greska u sistemu";
          }
          if(!res.login){
            this.message="*Uneli ste neispravne podatke!";
          }
          if(res.login){
            localStorage.setItem('dataSource', JSON.stringify(res.arrayOfUsers) );
            if(res.arrayOfUsers[0].type=="admin"){
              this.router.navigateByUrl('/admin');
            }else if(res.arrayOfUsers[0].type=="radnik"){
              this.router.navigateByUrl('/radnik');
            }else this.router.navigateByUrl('/korisnik');
          }
        },
        (err)=>console.log(err)
      );
    }
  }
}
