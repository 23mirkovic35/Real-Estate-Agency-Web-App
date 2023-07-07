import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-info',
  templateUrl: './real-estate-info.component.html',
  styleUrls: ['./real-estate-info.component.css']
})
export class RealEstateInfoComponent implements OnInit {
  i:number; // za slike
  j:number; // za video zapise
  data:any;
  id:number;
  contactPage:boolean=false;
  description:string;
  city:string
  community:string;
  accepted:boolean;
  address:string;
  imagesPath:string;
  videosPath:string;
  owner:string;
  furnished:string;
  roomNumber:number;
  sellOrRent:boolean;
  price:number;
  m2:number;
  promoted:number;
  type:string;
  //stan
  apartman:boolean;
  floor:number;
  totalFloors:number;
  //kuca
  houseFloors:number;
  //
  payment:string;
  credit:boolean;
  participation:number=0;
  //
  images:boolean;
  videos:boolean;
  showImageVideo:boolean=true; // image-true video-false
  arrayImages=[];
  arrayVideos=[];
  message:string="";
  messageRent="";
  messageSell='';
  typeOfPay:string;
  //izdavanje
  dateFrom:Date;
  dateTo:Date;
  constructor(private http:HttpClient) {
    this.i=0;
    this.j=0;
   }

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem("real-estate"));
    this.id=this.data.id;
    this.description=this.data.description;
    this.city=this.data.city;
    this.community=this.data.community;
    this.accepted=this.data.accepted;
    this.address=this.data.address;
    this.imagesPath=this.data.imagesPath;
    if(this.imagesPath!=""){
      this.images=true;
      var image=this.imagesPath.split(',');
      for(let cnt=0; cnt<image.length;cnt++){
        this.arrayImages.push("../../assets/uploads/immovables/"+image[cnt])
      }
      console.log(this.arrayImages);
    }
    this.videosPath=this.data.videosPath;
    if(this.videosPath!=""){
      this.videos=true;
      var video=this.videosPath.split(',');
      for(let cnt=0; cnt<video.length; cnt++){
        this.arrayVideos.push("../../assets/uploads/immovables/"+video[cnt])
      }
      console.log(this.arrayVideos);
    }else this.message="*Nekretnina nema video zapise.";
    this.owner=this.data.owner;
    if(this.data.furnished==1){
      this.furnished="namešteno"
    }else this.furnished="nenamešteno"
    this.roomNumber=this.data.roomNumber;
    this.sellOrRent=this.data.sellOrRent;
    this.price=this.data.price;
    this.m2=this.data.m2;
    this.promoted=this.data.promoted;
    if(this.data.type==1) {
      this.apartman=true;
      this.type="stan";
      this.http.post<any>('http://localhost:3000/realEstateInfo/apartman/'+ this.id,null).subscribe(
        (res) =>{
          if(res.find){
            this.floor=res.array[0].floor;
            this.totalFloors=res.array[0].totalFloors;
          }
        },
        (err)=>console.log(err)
      );
    }
    else {
      this.type='kuća';
      this.apartman=false;
      this.http.get<any>('http://localhost:3000/realEstateInfo/house/'+ this.id).subscribe(
        (res) =>{
          if(res.find){
            this.houseFloors=res.array[0].floor;
          }
        },
        (err)=>console.log(err)
      );
    }

    localStorage.removeItem('real-estate');
  }

  moveLeft():void{
    if(this.i-1==-1){
      this.i=this.arrayImages.length-1;
    }else this.i--;
  }

  moveLeftVideo():void{
    if(this.j-1==-1){
      this.j=this.arrayVideos.length-1;
    }else this.j--;
  }

  moveRight():void{
    if(this.i+1==this.arrayImages.length){
      this.i=0;
    }else this.i++;
  }

  moveRightVideo():void{
    if(this.j+1==this.arrayVideos.length){
      this.j=0;
    }else this.j++;
    console.log(this.arrayVideos[this.j]);
  }
  
  showImage():void{
    this.showImageVideo=true;
  }
  showVideo():void{
    this.showImageVideo=false;
  }

  prodaja(){
    let user=JSON.parse(localStorage.getItem('dataSource'))
    let username=user[0].username
    console.log(username)
    if(username!=this.owner){
      if(this.typeOfPay=="" || this.typeOfPay==null || this.typeOfPay==undefined){
        this.messageSell="*Izaberite način plaćanja"
      }else{

        const data={
          idN:this.id,
          idB:user[0].id,
          type:this.typeOfPay
        }
        this.http.post<any>('http://localhost:3000/realEstate/sell',data).subscribe(
          (res)=>{
            if(res.insert) this.messageSell='*Uspesno ste iznajmili nekretninu';
          }
        );
      }
    }

  }

  izdavanje(){
    if(this.dateFrom==undefined){
      this.messageRent="*Molimo vas izaberite datum pocetka!"
    }else if(this.dateTo==undefined){
      this.messageRent="*Molimo Vas izaberite datum kraja!";
    }else{
      let user=JSON.parse(localStorage.getItem('dataSource'));
      let buyer=user[0].id;
      const data ={
        id:this.id,
        start:this.dateFrom,
        end:this.dateTo,
        buyer:buyer
      }
      this.http.post<any>('http://localhost:3000/realEstate/rent',data).subscribe(
        (res)=>{
          if(res.insert) this.messageRent='*Uspesno ste iznajmili nekretninu';
          else this.messageRent='*Nekretnina je zauzeta u zadatom periodu!';
        }
      );
    }
  }

  showProc(){
    this.credit=true;
    this.participation=this.price*0.2;
  }
  hideProc(){
    this.credit=false;
  }

  contact(){
    localStorage.setItem('inbox',JSON.stringify(false))
    let user=JSON.parse(localStorage.getItem('dataSource'));
    let username=user[0].username;
    let sellRent= this.data.sellOrRent;
    if(sellRent=='1'){
      if(this.typeOfPay=="" || this.typeOfPay==null || this.typeOfPay==undefined){
        this.messageSell="*Izaberite način plaćanja"
      }else{
        localStorage.setItem('idN',JSON.stringify(this.id))
        localStorage.setItem('typeOfPay',JSON.stringify(this.typeOfPay))
        localStorage.setItem('sellRent',JSON.stringify(sellRent))
        localStorage.setItem('desc',JSON.stringify(this.description))
        localStorage.setItem('user1', JSON.stringify(username))
        localStorage.setItem('user2', JSON.stringify(this.owner))
        this.contactPage=true;
      }
    }else{
      if(this.dateFrom==undefined){
        this.messageRent="*Molimo vas izaberite datum pocetka!"
      }else if(this.dateTo==undefined){
        this.messageRent="*Molimo Vas izaberite datum kraja!";
      }else{
        let user=JSON.parse(localStorage.getItem('dataSource'));
        let buyer=user[0].id;
        const data ={
        id:this.id,
        start:this.dateFrom,
        end:this.dateTo,
        buyer:buyer
      }
      this.http.post<any>('http://localhost:3000/realEstate/rent/check',data).subscribe(
        (res)=>{
         if(!res.insert) this.messageRent='*Nekretnina je zauzeta u zadatom periodu!';
         else{
          let user=JSON.parse(localStorage.getItem('dataSource'));
          let buyer=user[0].id;
          const data ={
            id:this.id,
            start:this.dateFrom,
            end:this.dateTo,
            buyer:buyer
          }
          let sellRent= this.data.sellOrRent;
          localStorage.setItem('rent-info',JSON.stringify(data))
          localStorage.setItem('sellRent',JSON.stringify(sellRent))
          localStorage.setItem('desc',JSON.stringify(this.description))
          localStorage.setItem('user1', JSON.stringify(username))
          localStorage.setItem('user2', JSON.stringify(this.owner))
          this.contactPage=true;
         }
        }
      );
      }
    }
  }

}
