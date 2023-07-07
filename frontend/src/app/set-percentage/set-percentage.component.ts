import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-percentage',
  templateUrl: './set-percentage.component.html',
  styleUrls: ['./set-percentage.component.css']
})
export class SetPercentageComponent implements OnInit {
  sell:number;
  rent:number;
  message="";
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  setSell(){
    if(this.sell==null || this.sell==undefined || this.sell.toString()==""){
      this.message='*Niste uneli procenat za prodaju';
    }else{
      const data={
        proc:this.sell
      }
      this.http.post<any>('http://localhost:3000/percentage/sell',data).subscribe(
        (res) =>{
          if(res.update){
            this.message='*Uspšno promenjen procnat!';
          }
        },
        (err)=>console.log(err)
      )
    }
  }

  setRent(){
    if(this.rent==null || this.rent==undefined || this.rent.toString()==""){
      this.message='*Niste uneli procenat za izdavanje';
    }else{
      const data={
        proc:this.rent
      }
      this.http.post<any>('http://localhost:3000/percentage/rent',data).subscribe(
        (res) =>{
          if(res.update){
            this.message='*Uspšno promenjen procnat!';
          }
        },
        (err)=>console.log(err)
      )
    }
  }

}
