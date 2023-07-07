import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-update',
  templateUrl: './real-estate-update.component.html',
  styleUrls: ['./real-estate-update.component.css']
})
export class RealEstateUpdateComponent implements OnInit {
  showImageVideo:boolean=true;
  data:any;
  images:any;
  videos:any;
  realEstate:any;
  index:number;
  sell:boolean;
  rent:boolean;
  equipped:boolean;
  unequipped:boolean;
  //
  id:number;
  description:string;
  city:string;
  community:string;
  address:string;
  furnished:boolean;
  m2:number;
  price:number;
  roomNumber:number;
  seellOrRent:boolean;
  type:string;
  owner:string;
  //stan
  apartman:boolean;
  floor:number;
  totalFloors:number;
  //kuca
  houseFloors:number;

  imageCnt:number=0;
  videoCnt:number=0;

  changeDescription:boolean=false;
  cntForDescChange:number=0;
  changePrice:boolean=false;
  cntForPriceChange:number=0;
  changeBasicInfo:boolean=false;
  cntForBasicInfoChange:number=0;
  changeM2:boolean=false;
  cntForM2Change:number=0;
  changeRoomNumber:boolean=false;
  cntForRoomNumberChange:number=0;
  changeFloor:boolean=false;
  cntForFloorChange:number=0;
  changeTotalFloors:boolean=false;
  cntForTotalFloorsChange:number=0;
  changeHouseFloor:boolean=false;
  cntForHouseFloorChange:number=0;
  //
  imagesFile:any=null;
  videoFile:any=null;
  videosLength:number=0;
  imagesLength:number=0;
  arrayOfImagesUrl:string[];
  arrayOfVideoUrl:string[];
  url:string;
  message="";
  messageVideo="";
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem("myRealEstates"));
    this.index=JSON.parse(localStorage.getItem("index"));
    this.realEstate=this.data[this.index];
    this.images=this.realEstate.imagesPath.split(',');
    for(let i=0;i<this.images.length;i++){
      this.images[i]='../../assets/uploads/immovables/'+this.images[i];
    }
    console.log(this.images)
    this.videos=this.realEstate.videosPath.split(',');
    if(this.videos.length==1 && this.videos[0]==""){
      this.videos=[];
      this.messageVideo="*Nekretnina nema video zapise.";
    }else{
      for(let i=0;i<this.videos.length;i++){
        this.videos[i]='../../assets/uploads/immovables/'+this.videos[i];
      }
    }
    this.id=this.realEstate.id;
    this.owner=this.realEstate.owner;
    this.description=this.realEstate.description;
    this.city=this.realEstate.city;
    this.community=this.realEstate.community;
    this.address=this.realEstate.address;
    if(this.realEstate.furnished==0){
      this.furnished=false;
      this.equipped=false;
      this.unequipped=true;
    }
    else {
      this.furnished=true;
      this.equipped=true;
      this.unequipped=false;
    }
    this.m2=this.realEstate.m2;
    this.price=this.realEstate.price;
    this.roomNumber=this.realEstate.roomNumber;
    if(this.realEstate.sellOrRent==0){
      this.seellOrRent=false;
      this.sell=false;
      this.rent=true;
    }else {
      this.seellOrRent=true;
      this.sell=true;
      this.rent=false;
    }
    this.type=this.realEstate.type;
    if(this.type=='0'){
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
    }else {
      this.type='stan';
      this.apartman=true;
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
    alert(this.videos);
    //console.log(this.realEstate)
    /*console.log(this.images);
    console.log(this.videos); 
    console.log(this.id+" "+this.description+" "+this.community+" "+this.city+" "+this.address)
    console.log(this.furnished+" "+this.m2+" "+this.price+" "+this.roomNumber+" "+this.seellOrRent)*/
  }
  changeDescriptionFun():void{
    if(this.cntForDescChange%2==0){
      this.changeDescription=true;
      this.cntForDescChange++;
    }else {
      this.changeDescription=false
      this.cntForDescChange++;
    }
  }
  changePriceFun():void{
    if(this.cntForPriceChange%2==0){
      this.changePrice=true;
      this.cntForPriceChange++;
    }else {
      this.changePrice=false
      this.cntForPriceChange++;
    }
  }
  changeBasicInfoFun():void{
    if(this.cntForBasicInfoChange%2==0){
      this.changeBasicInfo=true;
      this.cntForBasicInfoChange++;
    }else {
      this.changeBasicInfo=false
      this.cntForBasicInfoChange++;
    }
  }

  changeM2Fun():void{
    if(this.cntForM2Change%2==0){
      this.changeM2=true;
      this.cntForM2Change++;
    }else {
      this.changeM2=false
      this.cntForM2Change++;
    }
  }

  changeRoomNumberFun():void{
    if(this.cntForRoomNumberChange%2==0){
      this.changeRoomNumber=true;
      this.cntForRoomNumberChange++;
    }else {
      this.changeRoomNumber=false
      this.cntForRoomNumberChange++;
    }
  }

  changeFloorFun():void{
    if(this.cntForFloorChange%2==0){
      this.changeFloor=true;
      this.cntForFloorChange++;
    }else {
      this.changeFloor=false
      this.cntForFloorChange++;
    }
  }

  changeTotalFloorsFun():void{
    if(this.cntForTotalFloorsChange%2==0){
      this.changeTotalFloors=true;
      this.cntForTotalFloorsChange++;
    }else {
      this.changeTotalFloors=false
      this.cntForTotalFloorsChange++;
    }
  }

  changeHouseFloorsFun():void{
    if(this.cntForHouseFloorChange%2==0){
      this.changeHouseFloor=true;
      this.cntForHouseFloorChange++;
    }else {
      this.changeHouseFloor=false
      this.cntForHouseFloorChange++;
    }
  }

  moveRightImage():void{
    if(this.imageCnt+1==this.images.length){
      this.imageCnt=0;
    }else{
      this.imageCnt++;
    }
  }

  moveLeftImage():void{
    if(this.imageCnt-1==-1){
      this.imageCnt=this.images.length-1
    }else{
      this.imageCnt--;
    }
  }

  moveRightVideo():void{
    if(this.videoCnt+1==this.videos.length){
      this.videoCnt=0;
    }else this.videoCnt++;
  }

  moveLeftVideo():void{
    if(this.videoCnt-1==-1){
      this.videoCnt=this.videos.length-1;
    }else this.videoCnt--;
  }

  changeFurnished(value:boolean):void{
    this.furnished=value;
    console.log("Namesteno ili ne: "+this.furnished);
  }

  changeSellRent(value:boolean):void{
    this.seellOrRent=value;
    console.log("Sell or rent: " + this.seellOrRent)
  }

  onSelectImages(e){
    if(e.target.files){
      this.imagesLength=0;
      this.imagesFile=e.target.files;
      this.arrayOfImagesUrl=new  Array<string>(this.imagesFile.length);
      for(let i=0;i<this.imagesFile.length;i++){
        const file=e.target.files[i];
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.arrayOfImagesUrl[i]=this.url;
        }
      }
    }
    this.imagesLength+=this.imagesFile.length;
  }

  onSelectVideo(e){
    if(e.target.files){
      this.videosLength=0;
      this.videoFile=e.target.files;
      this.arrayOfVideoUrl=new  Array<string>(this.videoFile.length);
      for(let i=0;i<this.videoFile.length;i++){
        const file=e.target.files[i];
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.arrayOfVideoUrl[i]=this.url;
        }
      }
    }
    this.videosLength+=this.videoFile.length;
  }

  updateRealEstate(){
    if(this.description!="" && this.city!="" && this.community!="" && this.address!="" && this.m2.toString()!="" && this.price.toString()!="" && this.roomNumber.toString()!=""){
      let oldImagesPath=this.realEstate.imagesPath
      let oldVideosPath=this.realEstate.videosPath
      if(oldVideosPath==null || oldVideosPath==undefined || oldVideosPath==""){
        oldVideosPath='noOldVideos'
      }
      this.message="";
      const formData=new FormData();
      if(this.imagesFile!=null || this.imagesFile!=undefined){
        for(let img  of this.imagesFile){
          formData.append('files',img);
        }
      }
      if(this.videoFile!=null || this.videoFile!=undefined){
        for(let video of this.videoFile){
          formData.append('files',video)
        }
      }
      const data={
        id:this.id,
        desc:this.description,
        city:this.city,
        community: this.community,
        address:this.address,
        oldImagesPath:oldImagesPath,
        oldVideosPath:oldVideosPath,
        furnished:this.furnished,
        roomNumber:this.roomNumber,
        sellOrRent:this.seellOrRent,
        price:this.price,
        m2:this.m2,
        type:this.type,
        floor:this.floor,
        totalFloors:this.totalFloors,
        houseFloors:this.houseFloors,
        imageLenght:this.imagesLength
      }
      console.log(data)
      if(this.type=='kuća') this.type='kuca';
      this.http.post<any>('http://localhost:3000/updateMyRealEstate/'+this.id+"/"+this.description+"/"+this.city+"/"+this.community+"/"+this.address+"/"+oldImagesPath+"/"+oldVideosPath+"/"+this.furnished+"/"+this.roomNumber+"/"+this.seellOrRent+"/"+this.price+"/"+this.m2+"/"+this.type+"/"+this.floor+"/"+this.totalFloors+"/"+this.houseFloors+"/"+this.imagesLength,formData).subscribe(
        (res) => {
          localStorage.removeItem('myRealEstates')
          localStorage.removeItem('index')
          window.location.reload()
        },
        (err)=>console.log(err)
      );
    }else{
      this.message="*Unesite sve potrebne podatke o nekretnini!"
    }
  }

  showImage(){
    this.showImageVideo=true;
  }
  showVideo(){
    this.showImageVideo=false;
  }

}
