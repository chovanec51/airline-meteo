import { Component, OnInit } from '@angular/core';
import { Observable, defaultIfEmpty, take } from 'rxjs';
import { OPMETResponseResult } from '../shared/model/opmet-response-result.model';
import { Store } from '@ngrx/store';
import { selectOutputData } from '../shared/store/report.selectors';
import { Router } from '@angular/router';
import { GroupHeader, GroupedRows } from '../shared/model/group.model';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit {
  displayedColumns: string[] = ['reportType', 'reportTime', 'textHTML'];
  outputData$!: Observable<(OPMETResponseResult | GroupHeader)[]>;
  
  constructor(private store: Store<{reportData: GroupedRows}>, private router: Router) {}

  ngOnInit(): void {
    this.outputData$ = this.store.select(selectOutputData);
  }

  isGroup(item: GroupHeader): boolean{
    return item.isGroupBy;
  }

  backToForm() {
    this.router.navigate(['/form']);
  }
}
