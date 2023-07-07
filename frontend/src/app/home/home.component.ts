import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message:string;
  city:string;
  min:number;
  max:number;
  arrayResult:any;
  arrayType:string[];
  houseFloorType:string[];
  randomImageArray:string[];
  promotedImageArray:string[];
  imagePath:any;
  promotedImagePath:any;
  i:number=0;
  promoted:boolean;
  arrayOfPromoted:any[];
  logInSignUp:boolean=true;
  admin:boolean;
  info:boolean=false;
  homePage:boolean=true;
  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('type')!=null){
      this.logInSignUp=false;
    }
    if(localStorage.getItem('type')=='admin'){
      this.admin=true;
    }
    this.http.post<any>('http://localhost:3000/promoted', null).subscribe(
      (res)=>{
        this.promoted=res.promoted;
        if(res.promoted==true){
          this.arrayOfPromoted=res.array;
          this.promotedImageArray=Array<string>(res.length)
          for(let i=0; i<res.array.length; i++){
            this.promotedImagePath=res.array[i].imagesPath.split(',');
            this.promotedImageArray[i]="../../assets/uploads/immovables/"+this.promotedImagePath[0]
          }
        }
      },
      (err)=>{console.log(err)}
    );
  }

  back():void{
    this.router.navigateByUrl('/admin')
  }

  login():void{
    this.router.navigateByUrl('/login');
  }

  signup():void{
    this.router.navigateByUrl('/signup');
  }
  moveRight():void{
    if(this.i+1>this.promotedImageArray.length-1){
      this.i=0;
    }else this.i++;
  }
  moveLeft():void{
    if(this.i-1<0){
      this.i=this.promotedImageArray.length-1
    }else this.i--;
  }
  search():void{
    if((this.city!=null && this.city!=undefined && this.city!="") || (this.min!=null && this.min!=undefined && this.min.toString()!="") || (this.max!=null && this.max!=undefined && this.max.toString()!="")){
      this.message="";
      const data={
        city:this.city,
        min:this.min,
        max:this.max
      };
      this.http.post<any>('http://localhost:3000/search', data).subscribe(
        (res)=>{
          if(res.find==true){
            this.arrayResult=res.array;
            this.arrayType=Array<string>(res.array.length)
            this.houseFloorType=Array<string>(res.array.length)
            this.randomImageArray=Array<string>(res.array.length)
            for(let i=0; i<res.array.length;i++){
              if(res.array[i].sellOrRent==1){
                this.arrayType[i]="Prodaje se"
              }else this.arrayType[i]="Izdaje se"
            }
            for(let i=0; i<res.array.length;i++){
              if(res.array[i].type==0){
                this.houseFloorType[i]="Kuća";
              }else{
                if(res.array[i].roomNumber==1)  this.houseFloorType[i]="Jednosoban stan";
                else if(res.array[i].roomNumber==1.5)  this.houseFloorType[i]="Jednoiposoban stan";
                else if(res.array[i].roomNumber==2)  this.houseFloorType[i]="Dvosoban stan";
                else if(res.array[i].roomNumber==2.5)  this.houseFloorType[i]="Dvoiposoban stan";
                else if(res.array[i].roomNumber==3)  this.houseFloorType[i]="Trosoban stan";
                else if(res.array[i].roomNumber==3.5)  this.houseFloorType[i]="Troiposoban stan";
                else if(res.array[i].roomNumber==4)  this.houseFloorType[i]="Četvorosoban stan";
                else if(res.array[i].roomNumber==4.5)  this.houseFloorType[i]="Četvoroiposovan stan";
                else  this.houseFloorType[i]="Stan sa "+ res.array[i].roomNumber+" soba";
              }
            }
            for(let i=0; i<res.array.length; i++){
              this.imagePath=res.array[i].imagesPath.split(',');
              const random=Math.floor(Math.random() * this.imagePath.length);
              this.randomImageArray[i]="../../assets/uploads/immovables/"+this.imagePath[random] 
            }
          }
        },
        (err)=>{}
      );
    }else{
      this.message="*Molimo vas da unesete parametre pretrage!"
    }
  }

  infoFromSearch(re:any):void{
    if(localStorage.getItem('type')=='korisnik'){
      var data={
        id:re.id,
        description:re.description,
        city:re.city,
        community:re.community,
        accepted:re.accepted,
        address:re.address,
        imagesPath:re.imagesPath,
        videosPath:re.videosPath,
        owner:re.owner,
        furnished:re.furnished,
        roomNumber:re.roomNumber,
        sellOrRent:re.sellOrRent,
        price:re.price,
        m2:re.m2,
        promoted:re.promoted,
        type:re.type
      }
      console.log(data)
      localStorage.setItem('real-estate',JSON.stringify(data));
      this.info=true;
      this.homePage=false;
    }
  }

  infoFromGallery(i){
    this.infoFromSearch(this.arrayOfPromoted[i]);
  }

}
