import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  realEstate:any;
  messageText:string;
  title:string;
  messages:string[]=[];
  conversation:any[]=[];
  username:string;
  owner:string;
  type:string;
  now:string;
  showOfferButton:boolean=true;
  times:string[]=[];
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    let inbox=JSON.parse(localStorage.getItem('inbox'));
    if( inbox) {
      this.showOfferButton=false;
    }
    let date=new Date();
    this.now=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" ";
    if(date.getHours()<10){
      this.now+="0"+date.getHours();
    }else this.now+=date.getHours();
    if(date.getMinutes()<10){
      this.now+=":0"+date.getMinutes();
    }else this.now+=":"+date.getMinutes();
    this.title=JSON.parse(localStorage.getItem('desc'));
    this.username=JSON.parse(localStorage.getItem('user1'));
    this.owner=JSON.parse(localStorage.getItem('user2'));
    const data={
      title:this.title,
      user1:this.username,
      user2:this.owner
    }
    const data_new={
      title:this.title
    }
    this.http.post<any>('http://localhost:3000/realEstate/checkOwner',data_new).subscribe(
        (res) =>{
          if(this.username==res.owner) this.showOfferButton=false;
        },
        (err)=>console.log(err)
      );
    this.http.post<any>('http://localhost:3000/chat/getMessages',data).subscribe(
        (res) =>{
          this.conversation=res.array
          for(let i=0; i<this.conversation.length;i++){
            let date=new Date(this.conversation[i].time);
            let help:string=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" ";
            if(date.getHours()<10){
              help+="0"+date.getHours();
            }else help+=date.getHours();
            if(date.getMinutes()<10){
              help+=":0"+date.getMinutes();
            }else help+=":"+date.getMinutes();
            this.times.push(help);
          }
          console.log(this.times)
          console.log(this.conversation)
          let a = JSON.parse(localStorage.getItem('dataSource'))
          this.type=a[0].type;
          if(this.type!='korisnik'){
            this.showOfferButton=false;
          }
        },
        (err)=>console.log(err)
      );
  }



  sendMessage(){
    if(this.messageText!="" && this.messageText!=null && this.messageText!=undefined){
      this.messages.push(this.messageText);
      const data={
        title:this.title,
        user1:this.username,
        user2:this.owner,
        text:this.messageText
      }
      this.http.post<any>('http://localhost:3000/chat/sendMessage',data).subscribe(
          (res) =>{
            if(res.insert){

            }
          },
          (err)=>console.log(err)
        );
      this.messageText="";
    }
  }

  sendOffer(){
    let sellOrRent:number=JSON.parse(localStorage.getItem('sellRent'));
    if(sellOrRent==0){
      const data=JSON.parse(localStorage.getItem('rent-info'))
      console.log(data)
      const id:number=data.id;
      const start:Date=data.start
      const end:Date=data.end
      const buyer:number=data.buyer
      console.log(id+" "+start+" "+end+" "+buyer);
      this.http.post<any>('http://localhost:3000/realEstate/rent/insert',data).subscribe(
        (res)=>{
          if(res.insert){
            this.messageText="Ponuda je poslata!";
            this.sendMessage();
          }
        },
        (err)=> console.log(err)
      );
    }else{
      let idN:number=JSON.parse(localStorage.getItem('idN'));
      let user=JSON.parse(localStorage.getItem('dataSource'));
      let idB=user[0].id;
      let type=JSON.parse(localStorage.getItem('typeOfPay'));
      const data={
        idN:idN,
        idB:idB,
        type:type
      }
      this.http.post<any>('http://localhost:3000/realEstate/sell',data).subscribe(
          (res)=>{
            if(res.insert) {
                  this.messageText="Ponuda je poslata!";
                  this.sendMessage();
            }
          }
        );
    }

  }

  check(user):boolean{
    if(this.type=='korisnik'){
      if(user==this.username)return true
    }else{
      if(user=='agencija')return true
    }
    return false;
  }

}
