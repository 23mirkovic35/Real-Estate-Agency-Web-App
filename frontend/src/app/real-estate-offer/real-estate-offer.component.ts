import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-offer',
  templateUrl: './real-estate-offer.component.html',
  styleUrls: ['./real-estate-offer.component.css']
})
export class RealEstateOfferComponent implements OnInit {
  data:any;
  index:number;
  realEstate:any;
  message:string="";
  offers:any[];
  show:boolean=false;
  rent:boolean=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem("myRealEstates"));
    this.index=JSON.parse(localStorage.getItem("index"));
    this.realEstate=this.data[this.index];
    if(this.realEstate.sellOrRent=='1'){
      const data={
        idN:this.realEstate.id
      }
      this.http.post<any>('http://localhost:3000/realEstate/showOffers/sell',data).subscribe(
          (res) =>{
            if(!res.find){
              this.message="*Trenutno nema ponuda za odabranu nekretninu!"
            }else{
              this.offers=res.array;
              this.show=true;
              console.log(this.offers)
            }
          },
          (err)=>console.log(err)
        );
    }
    else{
      const data={
        idN:this.realEstate.id
      }
      this.http.post<any>('http://localhost:3000/realEstate/showOffers/rent',data).subscribe(
          (res) =>{
            if(!res.find){
              this.message="*Trenutno nema ponuda za odabranu nekretninu!"
            }else{
              this.offers=res.array;
              this.rent=true; 
              for(let i=0;i<this.offers.length;i++){
                let a:string=res.array[i].start;
                let time:Date=new Date(a);
                let date=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
                this.offers[i].start=date;
                //end
                a=res.array[i].end;
                time=new Date(a);
                date=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
                this.offers[i].end=date;
              }
              console.log(this.offers)
            }
          },
          (err)=>console.log(err)
        );
    }
  }

  accept(id, idB){
    const data={
      id:id,
      idN:this.realEstate.id,
      type:this.realEstate.sellOrRent,
      IdB:idB
    }
    this.http.post<any>('http://localhost:3000/realEstate/showOffers/accept',data).subscribe(
        (res) =>{
          if(this.realEstate.sellOrRent=='0'){
            
            this.offers.forEach((elem,index)=>{
              if(elem.id==id) this.offers.splice(index,1);
            });
            res.array.forEach((elem, index)=>{
              if(elem.id==id) this.offers.splice(index,1);
              for(let i=0;i<this.offers.length;i++){
                if(elem.id==this.offers[i].id){
                  this.offers.splice(i,1);
                  break;
                }
              }
            })
          }else{
            if(res.delete){
              this.offers=[];
            }
          }
        },
        (err)=>console.log(err)
      );
  }
  refuse(id){
    const data={
      id:id,
      type:this.realEstate.sellOrRent
    }
    this.http.post<any>('http://localhost:3000/realEstate/showOffers/refuse',data).subscribe(
        (res) =>{
          if(res.delete){
            this.offers.forEach((elem, index)=>{
              if(elem.id == data.id){
                this.offers.splice(index,1);
              }
            })
          }
        },
        (err)=>console.log(err)
      );
  }

}
