import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-registration',
  templateUrl: './real-estate-registration.component.html',
  styleUrls: ['./real-estate-registration.component.css']
})
export class RealEstateRegistrationComponent implements OnInit {
  isAgent:boolean=false;
  isUser:boolean=false;
  floor:boolean;
  house:boolean;
  user:boolean;
  agency:boolean;
  images;
  videos;
  imagesLenght:number=0;
  videosLenght:number=0;
  url:string;
  arrayOfUrls:string[];
  arrayOfUrlVideos:string[];
  arrayOfUsernames:any[];
  
  message:string;
  // promenvljive za bazu podataka

  name:string;
  address:string;
  roomNumber:number;
  m2:number;
  price:number;
  type:string;
  sellRent:boolean;
  furnished:boolean;
  owner:string;
  username:string;
  floorNumber:number;
  buildingFloorNumber:number;
  houseFloorNum:number;
  community:string;
  city:string;
  constructor(private http:HttpClient) { 
    this.images=null;
    this.videos=null;
  }

  ngOnInit(): void {
    this.message="";
    if(localStorage.getItem('type')!='radnik' && localStorage.getItem('type')!='korisnik' ){
      //this.isAgent=false;
      this.http.post<any>('http://localhost:3000/checkUsername',null).subscribe(
      (res) =>{
        if(res.find){
          this.arrayOfUsernames=res.array;
          console.log(this.arrayOfUsernames)
        }
      },
      (err)=>console.log(err)
    );
    }else if(localStorage.getItem('type')=='radnik'){
      this.isAgent=true;
      this.owner='agencija'
    } else{
      let data=JSON.parse(localStorage.getItem('dataSource'));
      this.owner=data[0].username;
      this.isUser=true;
    }
  }
  onSelectImages(e){
    if(e.target.files){
      this.imagesLenght=0;
      this.images=e.target.files;
      this.arrayOfUrls=new  Array<string>(this.images.length);
      for(let i=0;i<this.images.length;i++){
        const file=e.target.files[i];
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.arrayOfUrls[i]=this.url;
        }
      }
    }
    this.imagesLenght+=this.images.length;
  }
  onSelectVideos(e){
    if(e.target.files){
      this.videosLenght=0;
      this.videos=e.target.files;
      this.arrayOfUrlVideos=new  Array<string>(this.videos.length);
      for(let i=0;i<this.videos.length;i++){
        const file=e.target.files[i];
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.arrayOfUrlVideos[i]=this.url;
        }
      }
    }
    this.videosLenght+=this.videos.length;
  }
  setFloor():void{
    this.floor=true;
    this.house=false;
  }

  setHouse(){
    this.floor=false;
    this.house=true;
  }
  setAgency():void{
    this.agency=true;
    this.user=false;
  }
  setUser():void{
    this.agency=false;
    this.user=true;
  }
  setOwner():void{
    if(this.owner=="korisnik")
      this.setUser();
    else {
      this.username="";
      this.setAgency();
    }
  }
  setFields():void{
    if(this.type=='kuca'){
      this.setHouse();
      this.floorNumber=null;
      this.buildingFloorNumber=null;
    }else {
      this.setFloor();
      this.houseFloorNum=null;
    }
  }
  checkUser():boolean{
    for(let i=0;i<this.arrayOfUsernames.length;i++){
      console.log(this.arrayOfUsernames[i])
      if(this.username==this.arrayOfUsernames[i].username)
        return true
    }
    return false;
  }
  onConfirm():void{
    if(this.name=="" || this.name==null || this.name==undefined){
      this.message="*Molimo Vas da unesete naziv nekretnine!";
    }else if(this.address=="" || this.address==null || this.address==undefined){
      this.message="*Molimo Vas da unesete adresu na kojoj se nekretnina nalazi!";
    }else if( this.community==undefined || this.community==null || this.community==""){
      this.message="*Molimo Vas da unesete opštinu na kojoj se nekretnina nalazi!";
    }else if( this.city==undefined || this.city==null || this.city==""){
      this.message="*Molimo Vas da unesete grad u kom se nekretnina nalazi!";
    }else if( this.m2==undefined || this.m2==null || this.m2.toString()==""){
      this.message="*Molimo Vas da unesete kvadraturu nekretnine!";
    }else if( this.roomNumber==null || this.roomNumber==undefined || this.roomNumber.toString()==""){
      this.message="*Molimo Vas da unesete broj soba nekretnine!";
    }else if(  this.price==undefined || this.price==null || this.price.toString()==""){
      this.message="*Molimo Vas da unesete cenu nekretnine!";
    }else if(this.type=="" || this.type==null || this.type==undefined){
      this.message="*Molimo Vas da unesete tip nekretnine!";
    }else if(this.type=="stan" && (this.floorNumber==null || this.floorNumber == undefined || this.buildingFloorNumber==null || this.buildingFloorNumber==undefined || this.buildingFloorNumber.toString()=="" || this.floorNumber.toString()=="")){
      if(this.floorNumber==null || this.floorNumber == undefined || this.floorNumber.toString()==""){
        this.message="*Molimo Vas da unesete broj sprata na kojem se stan nalazi!";
      }else if( this.buildingFloorNumber==null || this.buildingFloorNumber==undefined || this.buildingFloorNumber.toString()==""){
        this.message="*Molimo Vas da unesete koliko zgrada u kojoj je stan ima spratova!";
      } 
    }else if(this.type=="kuca" && (this.houseFloorNum==null || this.houseFloorNum==undefined || this.houseFloorNum.toString()=="")){
      this.message="*Molimo Vas da unesete koliko kuća ima spratova!";
    }else if(this.sellRent==undefined || this.sellRent==null){
      this.message="*Molimo Vas da izaberete da li je nekretnina na prodaju ili se iznajmljuje!";
    }else if(this.furnished==undefined || this.furnished==null){
      this.message="*Molimo Vas da izaberete da li je nekretnina nameštena ili ne!";
    }else if(this.owner==""||this.owner==null||this.owner==undefined){
      this.message="*Molimo Vas da odaberete tip vlasnika nekretnine!";
    }else if(this.owner=='korisnik' && (this.username=="" || this.username==null || this.username==undefined)){
      this.message="*Molimo Vas da unesete korisničko ime vlasnika nekretnine!";
    }else if(this.owner=='korisnik' && this.checkUser()==false){
      this.message="*Uneto korisničko ime ne postoji u sistemu!";
    }else if(this.imagesLenght+this.videos<2){
      this.message='*Minimalan broj slika i video zapisa koje morate da dodate je 3!'
    }else {
      if(this.owner=="korisnik"){
        this.owner=this.username;
      }
      const formData=new FormData();
      if(this.images!=null || this.images!=undefined){
        for(let img  of this.images){
          formData.append('files',img);
        }
      }
      if(this.videos!=null || this.videos!=undefined){
        for(let video of this.videos){
          formData.append('files',video)
        }
      }
      this.http.post<any>('http://localhost:3000/singupRealEstate/'+this.name+'/'+this.address+'/'+this.community+'/'+this.city+'/'+this.m2+'/'+this.roomNumber+'/'+this.price+'/'+this.type+'/'+this.floorNumber+'/'+this.buildingFloorNumber+'/'+this.houseFloorNum+'/'+this.sellRent+'/'+this.furnished+'/'+this.owner+'/'+localStorage.getItem('type')+'/'+this.imagesLenght,formData).subscribe(
        (res) =>{
          
          if(res.err=="ERROR"){
            this.message="*Greska u sistemu";
          }
          if(res.insert && localStorage.getItem('type')=="korisnik" ){
            this.message="*Zahtev je poslat, molimo Vas sačekajte da administrator odobri nalog.";
          }
        },
        (err)=>console.log(err)
      );
    }
  }

}
