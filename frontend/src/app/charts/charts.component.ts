import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  arrayChart1 = [];
  arrayChart2 = [];
  arrayChart3 = [];
  arrayChart4 = [];
  

  constructor(private http:HttpClient) { 
    this.http.post<any>('http://localhost:3000/chartCity',null).subscribe(
        (res) =>{
          if(res.chart){
            this.arrayChart1=res.array;
          }
        },
        (err)=>console.log(err)
    );
    this.http.post<any>('http://localhost:3000/chartApartman',null).subscribe(
        (res) =>{
          if(res.chart){
            this.arrayChart2=res.array;
          }
        },
        (err)=>console.log(err)
    );
    this.http.post<any>('http://localhost:3000/chartHouse',null).subscribe(
        (res) =>{
          if(res.chart){
            this.arrayChart3=res.array;
            console.log(this.arrayChart3)
          }
        },
        (err)=>console.log(err)
    );
    this.http.post<any>('http://localhost:3000/chartPrice',null).subscribe(
        (res) =>{
          if(res.chart){
            this.arrayChart4=res.array;
            console.log(this.arrayChart3)
          }
        },
        (err)=>console.log(err)
    );
  }

  ngOnInit(): void {
  }

}
