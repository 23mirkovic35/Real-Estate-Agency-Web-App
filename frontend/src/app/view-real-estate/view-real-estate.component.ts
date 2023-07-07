import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-real-estate',
  templateUrl: './view-real-estate.component.html',
  styleUrls: ['./view-real-estate.component.css']
})
export class ViewRealEstateComponent implements OnInit {
  arrayOfRE:any[];
  arrayType:any[];
  houseFloorType:any[];
  arrayOfImageUrl=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.post<any>('http://localhost:3000/view',null).subscribe(
        (res) =>{
          if(res.find){
            this.arrayOfRE=res.array;
            for(let i=0;i<this.arrayOfRE.length;i++){
              var imagePath=this.arrayOfRE[i].imagesPath.split(',')
              this.arrayOfImageUrl[i]="../../assets/uploads/immovables/"+imagePath[0];
            }
            this.arrayType=Array<string>(res.array.length)
            this.houseFloorType=Array<string>(res.array.length)
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
          }
        },
        (err)=>console.log(err)
      );
  }

}
