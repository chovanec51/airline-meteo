import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { take } from 'rxjs';
import { OPMETResponse } from '../shared/model/opmet-response.model';
import { OPMETResponseResult } from '../shared/model/opmet-response-result.model';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit {
  displayedColumns: string[] = ['reportType', 'reportTime', 'textHTML'];
  dataSource: (OPMETResponseResult | GroupBy)[] = [];
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
      this.dataService.subject.pipe(
        take(1)
      ).subscribe({
        next: (value: OPMETResponse | null) => {
          if (value)
            this.processResponse(value);
        }
      });
  }

  isGroup(index: any, item: any): boolean{
    return item.isGroupBy;
  }

  private processResponse(response: OPMETResponse) {
    const groupedData: {[stationId: string]: OPMETResponseResult[]} = {};
    const outputData: (OPMETResponseResult | GroupBy)[] = [];

    for (const resultRow of response.result) {
      if (groupedData[resultRow.stationId]) {
        groupedData[resultRow.stationId].push(resultRow);
      }
      else {
        groupedData[resultRow.stationId] = [resultRow]
      }
    }

    for (const stationId in groupedData) {
      outputData.push({stationId: stationId, isGroupBy: true});
      groupedData[stationId].forEach(row => outputData.push(row));
    }
    console.log(outputData);
    this.dataSource = outputData;
  }
  
}

const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [
  {stationId: 'B', isGroupBy: true},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {stationId: 'C', isGroupBy: true},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {stationId: 'F', isGroupBy: true},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {stationId: 'H', isGroupBy: true},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {stationId: 'L', isGroupBy: true},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {stationId: 'N', isGroupBy: true},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {stationId: 'O', isGroupBy: true},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface GroupBy {
  stationId: string;
  isGroupBy: boolean;
}
