import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
    name: string;

    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];

@Component({
  selector: 'app-internship-requests',
  templateUrl: './internship-requests.component.html',
  styleUrls: ['./internship-requests.component.scss']
})
export class InternshipRequestsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
