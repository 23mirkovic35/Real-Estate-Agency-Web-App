import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  arrayOfRealEstates:any[];
  arrayPromoted=[];
  arrayUnpromoted=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.post<any>('http://localhost:3000/promotion/select',null).subscribe(
      (res) =>{
        if(res.find){
          this.arrayOfRealEstates=res.array;
          
          for(let i=0;i<this.arrayOfRealEstates.length;i++){
            if(this.arrayOfRealEstates[i].promoted==1){
              var imagePath=this.arrayOfRealEstates[i].imagesPath.split(',')
              this.arrayOfRealEstates[i].imagesPath = "../../assets/uploads/immovables/"+imagePath[0];
              this.arrayPromoted.push(this.arrayOfRealEstates[i]);
            }
          }
          for(let i=0;i<this.arrayOfRealEstates.length;i++){
            if(this.arrayOfRealEstates[i].promoted==0){
              var imagePath=this.arrayOfRealEstates[i].imagesPath.split(',')
              this.arrayOfRealEstates[i].imagesPath="../../assets/uploads/immovables/"+imagePath[0];
              this.arrayUnpromoted.push(this.arrayOfRealEstates[i]);
            }
          }
        }
      },
      (err)=>console.log(err)
  );
  }

  promotion(i:number):void{
    const data={
      id:i,
      type:1
    }
    this.http.post<any>('http://localhost:3000/promotion/update',data).subscribe(
      (res) =>{
        if(res.update){
          this.arrayUnpromoted.forEach((elem, index)=>{
            if(elem.id == i){
              this.arrayPromoted.push(this.arrayUnpromoted[index])
              this.arrayUnpromoted.splice(index,1);
            }
          })
        }
      },
      (err)=>console.log(err)
    );
  }

  delete(i:number):void{
    const data={
      id:i,
      type:0
    }
    this.http.post<any>('http://localhost:3000/promotion/update',data).subscribe(
      (res) =>{
        if(res.update){
          this.arrayPromoted.forEach((elem, index)=>{
            if(elem.id == i){
              this.arrayUnpromoted.push(this.arrayPromoted[index])
              this.arrayPromoted.splice(index,1);
            }
          })
        }
      },
      (err)=>console.log(err)
    );
  }


}
