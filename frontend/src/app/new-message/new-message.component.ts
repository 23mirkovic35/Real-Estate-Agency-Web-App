import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  users:any[];
  username:string;
  realEstate:string;
  usernames:string[]=[];
  realEstates:string[]=[];
  showRE:boolean=false;
  showConversationPage: boolean=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/getAllUsers').subscribe(
      (res)=>{
        let cnt:number=0;
        this.users=res.array;
        for(let i=0; i<this.users.length;i++){
          if(this.users[i].type!='radnik' && this.users[i].type!='admin' ){
            this.usernames.push(this.users[i].username);
          }else{
            if(this.users[i].type=='radnik'){
              if(cnt==0){
                this.usernames.push('agencija');
                cnt++;
              }
            }
          }
        }
        console.log(this.usernames)
      },
      (err)=>console.log(err)
      );
  }

  next(){
    this.showRE=true;
    const data ={
      owner:this.username
    }
    this.http.post<any>('http://localhost:3000/realEstate/getAllRealEstate',data).subscribe(
      (res)=>{
        this.realEstates=res.array;
      },
      (err)=>console.log(err)
      );
  }

  sendMessage(){
    let agency=true;
    let user=JSON.parse(localStorage.getItem('dataSource'));
    localStorage.setItem('inbox',JSON.stringify(true))
    localStorage.setItem('desc',JSON.stringify(this.realEstate));
    localStorage.setItem('user2',JSON.stringify(this.username));
    for(let i=0; i<this.usernames.length;i++){
      if(this.usernames[i]==user[0].username){
        agency=false;
        break;
      }
    }
    if(agency){
      localStorage.setItem('user1', JSON.stringify('agencija'));
    }else {
      localStorage.setItem('user1', JSON.stringify(user[0].username));
    }
    this.showConversationPage=true
  }

}
