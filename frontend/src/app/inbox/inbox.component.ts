import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  username:string;
  data:any;
  type:string;
  conversations:any[]=[];
  conversationPage:boolean=false;
  inbox:boolean=true;
  newMessagePage:boolean=false;
  showArchiveButton:boolean=true;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem('dataSource'))
    this.type=this.data[0].type;
    if(this.type=='radnik') this.username='agencija';
    else this.username=this.data[0].username;
    const data={
      user:this.username
    }
    this.http.post<any>('http://localhost:3000/inbox/active', data).subscribe(
    (res)=>{
      this.conversations=res.array;
      for(let i=0; i<this.conversations.length;i++){
        let date:Date=new Date(this.conversations[i].time)
        let time = date.getDate() +"."+(date.getMonth()+1) +"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        this.conversations[i].time=time;
      }
      console.log(res.array)
    },
    (err)=>console.log(err)
    );
  }

  arhive(c){
    const data={
      user1:c.user1,
      user2:c.user2,
      title:c.title
    }
    this.http.post<any>('http://localhost:3000/inbox/archiveMessage', data).subscribe(
    (res)=>{
      if(res.update){
        this.conversations.forEach((elem, index)=>{
          if(elem.user1 == c.user1 && elem.user2==c.user2 && elem.title==c.title){
            this.conversations.splice(index,1);
          }
        })
      }
    },
    (err)=>console.log(err)
    );
  }

  showActive(){
    this.showArchiveButton=true;
    this.ngOnInit()
  }

  showArchive(){
    this.showArchiveButton=false;
    const data={
      user:this.username
    }
    this.http.post<any>('http://localhost:3000/inbox/archive', data).subscribe(
    (res)=>{
      this.conversations=res.array;
      for(let i=0; i<this.conversations.length;i++){
        let date:Date=new Date(this.conversations[i].time)
        let time = date.getDate() +"."+(date.getMonth()+1) +"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        this.conversations[i].time=time;
      }
      console.log(res.array)
    },
    (err)=>console.log(err)
    );
  }


  newMessage(){
    this.conversationPage=false;
    this.inbox=false;
    this.newMessagePage=true;
  }

  showConversation(c){
    localStorage.setItem('inbox',JSON.stringify(true))
    if(c.user1==this.username){
      localStorage.setItem('user1',JSON.stringify(c.user1));
      localStorage.setItem('desc',JSON.stringify(c.title));
      localStorage.setItem('user2',JSON.stringify(c.user2))
    }
    else{
      let tmp=c.user1;
      c.user1=c.user2;
      c.user2=tmp;
      localStorage.setItem('user1',JSON.stringify(c.user1));
      localStorage.setItem('desc',JSON.stringify(c.title));
      localStorage.setItem('user2',JSON.stringify(c.user2))
    }
    this.conversationPage=true;
    this.inbox=false;
    this.newMessagePage=false;
  }

  removeArhive(c){
    const data={
      user1:c.user1,
      user2:c.user2,
      title:c.title
    }
    this.http.post<any>('http://localhost:3000/inbox/archiveRemove', data).subscribe(
    (res)=>{
      this.conversations.forEach((elem, index)=>{
        if(elem.user1 == c.user1 && elem.user2==c.user2 && elem.title==c.title){
          this.conversations.splice(index,1);
        }
      })
      if(this.conversations!=null){

        for(let i=0; i<this.conversations.length;i++){
          let date:Date=new Date(this.conversations[i].time)
          let time = date.getDate() +"."+(date.getMonth()+1) +"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
          this.conversations[i].time=time;
        }
      }
      console.log(res.array)
    },
    (err)=>console.log(err)
    );
  }


}
