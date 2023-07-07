import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-real-estate',
  templateUrl: './my-real-estate.component.html',
  styleUrls: ['./my-real-estate.component.css']
})
export class MyRealEstateComponent implements OnInit {
  public static updateRE:boolean;
  public static offerRE:boolean;
  arrayMyRealEstate=[];
  arrayImages=[];
  arrayType=[];
  owner:string;
  data:any;
  constructor(private http:HttpClient) {}

 
  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem("dataSource"));
    if(this.data[0].type=='korisnik') this.owner=this.data[0].username;
    else this.owner='agencija';
    this.http.post<any>('http://localhost:3000/myRealEstate/'+this.owner,null).subscribe(
      (res)=>{
        if(res.find){
          this.arrayMyRealEstate=res.array;
          for(let i=0;i<this.arrayMyRealEstate.length;i++){
            var image=this.arrayMyRealEstate[i].imagesPath.split(',');
            this.arrayImages.push('../../assets/uploads/immovables/'+image[0]);
            if(this.arrayMyRealEstate[i].type==0){
              this.arrayType.push('kuća')
            }else this.arrayType.push('stan')
          }
        }
      },
      (err)=>{console.log(err)}
    );
  }

  get staticBooleanUpdate() {
    return MyRealEstateComponent.updateRE;
  }
  get staticBooleanOffers(){
    return MyRealEstateComponent.offerRE
  }

  updateRealEstate(index:number):void{
    localStorage.setItem('myRealEstates',JSON.stringify(this.arrayMyRealEstate));
    localStorage.setItem('index',JSON.stringify(index));
    MyRealEstateComponent.updateRE=true;
    MyRealEstateComponent.offerRE=false;
  }

  showOffers(index:number):void{
    localStorage.setItem('myRealEstates',JSON.stringify(this.arrayMyRealEstate));
    localStorage.setItem('index',JSON.stringify(index));
    MyRealEstateComponent.offerRE=true;
    MyRealEstateComponent.updateRE=false;
  }



}
