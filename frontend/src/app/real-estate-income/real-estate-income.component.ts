import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-income',
  templateUrl: './real-estate-income.component.html',
  styleUrls: ['./real-estate-income.component.css']
})
export class RealEstateIncomeComponent implements OnInit {
  contracts:any[]=[];
  sellRent:string[]=[];
  usernames:string[]=[];
  totalIncome:number=0;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/contracts/getAll').subscribe(
        (res)=>{
          this.contracts=res.data;
          for(let i=0;i<this.contracts.length;i++){
            const data={
              id:this.contracts[i].idUser
            }
            this.http.post<any>('http://localhost:3000/getAllUsersById',data).subscribe(
              (res)=>{
                this.usernames.push(res.username);
              },
              (err)=>{}
            );
            this.totalIncome+=res.incomes[i].income;
            if(!this.contracts[i].sellRent) this.sellRent.push('izdato')
            else this.sellRent.push('prodato')
          }
          console.log(this.usernames)
          console.log(res.data);
          console.log(this.totalIncome)
        },
        (err)=>console.log(err)
      );
  }

}
