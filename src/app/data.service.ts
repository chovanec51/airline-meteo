import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputData } from './shared/model/input-data.model';
import { RequestQuery } from './shared/model/request-query.model';
import { RequestQueryParams } from './shared/model/request-query-params.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { OPMETResponse } from './shared/model/opmet-response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _url: string = 'https://ogcie.iblsoft.com/ria/opmetquery';
  subject = new BehaviorSubject<OPMETResponse | null>(null);

  constructor(private _http: HttpClient, private router: Router) { }

  fetchData(userInput: InputData) {
    const queryObj: RequestQuery = {
      id: this.constructId(userInput, 'query'),
      method: 'query',
      params: [this.getParams(userInput)]
    }

    this._http.post<OPMETResponse>(this._url, queryObj).subscribe({
      next: response => {
        this.subject.next(response);
        this.router.navigate(['/output']);
      }
    });
  }

  private constructId(userInput: InputData, idType: string): string {
    let id: string = "";

    id += userInput.reportTypes.join("-") + "_";
    if (userInput.stations)
      id += userInput.stations.sort((a, b) => a.localeCompare(b)) + "_";
    if (userInput.countries)
      id += userInput.countries.sort((a, b) => a.localeCompare(b)) + "_";

    return id+idType;
  }

  private getParams(userInput: InputData): RequestQueryParams {
    const params: RequestQueryParams = {
      id: this.constructId(userInput, 'briefing'),
      reportTypes: userInput.reportTypes
    };

    if (userInput.stations)
      params.stations = userInput.stations;

    if (userInput.countries)
      params.countries = userInput.countries;

    return params;
  }

}



