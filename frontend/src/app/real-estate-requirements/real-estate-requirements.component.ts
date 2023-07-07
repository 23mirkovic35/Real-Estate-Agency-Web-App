import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-requirements',
  templateUrl: './real-estate-requirements.component.html',
  styleUrls: ['./real-estate-requirements.component.css']
})
export class RealEstateRequirementsComponent implements OnInit {

  
  realEstateRequirementsArray:any[];
  message:string;
  arrayType:string[];
  houseFloorType:string[];
  randomImageArray:string[];
  imagePath:any;
  constructor(private http:HttpClient) { 
    this.message="";
  }

  ngOnInit(): void {
    this.http.post<any>('http://localhost:3000/requirementsRE',null).subscribe(
      (res)=>{
        if(res.find==true){
          this.realEstateRequirementsArray=res.arrayOfRE;
          console.log(this.realEstateRequirementsArray)
          this.arrayType=Array<string>(res.arrayOfRE.length)
            this.houseFloorType=Array<string>(res.arrayOfRE.length)
            this.randomImageArray=Array<string>(res.arrayOfRE.length)
            for(let i=0; i<res.arrayOfRE.length;i++){
              if(res.arrayOfRE[i].sellOrRent==1){
                this.arrayType[i]="Prodaje se"
              }else this.arrayType[i]="Izdaje se"
            }
            for(let i=0; i<res.arrayOfRE.length;i++){
              if(res.arrayOfRE[i].type==0){
                this.houseFloorType[i]="Kuća";
              }else{
                if(res.arrayOfRE[i].roomNumber==1)  this.houseFloorType[i]="Jednosoban stan";
                else if(res.arrayOfRE[i].roomNumber==1.5)  this.houseFloorType[i]="Jednoiposoban stan";
                else if(res.arrayOfRE[i].roomNumber==2)  this.houseFloorType[i]="Dvosoban stan";
                else if(res.arrayOfRE[i].roomNumber==2.5)  this.houseFloorType[i]="Dvoiposoban stan";
                else if(res.arrayOfRE[i].roomNumber==3)  this.houseFloorType[i]="Trosoban stan";
                else if(res.arrayOfRE[i].roomNumber==3.5)  this.houseFloorType[i]="Troiposoban stan";
                else if(res.arrayOfRE[i].roomNumber==4)  this.houseFloorType[i]="Četvorosoban stan";
                else if(res.arrayOfRE[i].roomNumber==4.5)  this.houseFloorType[i]="Četvoroiposovan stan";
                else  this.houseFloorType[i]="Stan sa "+ res.arrayOfRE[i].roomNumber+" soba";
              }
            }
            for(let i=0; i<res.arrayOfRE.length; i++){
              this.imagePath=res.arrayOfRE[i].imagesPath.split(',');
              const random=Math.floor(Math.random() * this.imagePath.length);
              this.randomImageArray[i]="../../assets/uploads/immovables/"+this.imagePath[0] 
            }
        }else if(res.find==false){
          this.message="*Trenutno nema zahteva za nove nekretnine!";
        }
      },
      (err)=>{console.log(err)}
    );
  }
  accept(id:number):void{
    const data={
      id:id
    }
    this.http.post<any>('http://localhost:3000/accpetRE',data).subscribe(
      (res)=>{
        if(res.update==true){
          this.realEstateRequirementsArray.forEach((elem, index)=>{
            if(elem.id == id){
              this.realEstateRequirementsArray.splice(index,1);
            }
          })

          this.ngOnInit();
        }
      },
      (err)=>{}
    );
  }
  refuse(id:number):void{
    const data={
      id:id
    }
    this.http.post<any>('http://localhost:3000/deletetRE',data).subscribe(
      (res)=>{
        if(res.delete==true){
          this.realEstateRequirementsArray.forEach((elem, index)=>{
            if(elem.id == id){
              this.realEstateRequirementsArray.splice(index,1);
            }
          })

          this.ngOnInit();
        }
      },
      (err)=>{}
    );

  }

}
