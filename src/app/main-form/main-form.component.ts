import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { requiredFieldGroupValidator } from '../validators/check-required-fields.validator';
import { validCodesValidator } from '../validators/valid-codes.validator';
import { ICAOCodeRegex, WMOCodeRegex } from '../shared/constants';
import { DataService } from '../data.service';
import { InputData } from '../shared/model/input-data.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.css'
})
export class MainFormComponent {
  public form: FormGroup;

  constructor(fb: FormBuilder, private dataService: DataService) {
    this.form = fb.group(
      {
        messageTypes: fb.group(
          {
            metar: [true],
            sigmet: [],
            taf_longtaf: []
          },
          {
            validators: [requiredFieldGroupValidator(['metar', 'sigmet', 'taf'])],
            updateOn: 'change'
          }
        ),
        airports: ['', [validCodesValidator(ICAOCodeRegex)]],
        countries: ['', [validCodesValidator(WMOCodeRegex)]]
      },
      {
        validators: [requiredFieldGroupValidator(['airports', 'countries'])],
        updateOn: 'blur'
      }
    );
  }

  onCreateBriefing() {
    const formData: InputData = {
      reportTypes: this.getReportTypes()
    }

    if (this.airports.value)
      formData.stations = this.airports.value.split(' ');
    
    if (this.countries.value)
      formData.countries = this.countries.value.split(' ');

    this.dataService.fetchData(formData);
  }

  private getReportTypes(): string[] {
    const reportTypes: string[] = [];

    for (const controlName in this.messageTypes.controls) {
      if (this.messageTypes.controls[controlName].value) {
        reportTypes.push(controlName.toUpperCase());
      }
    }

    return reportTypes;
  }

  get messageTypes(): FormGroup {
    return (this.form.get('messageTypes') as FormGroup);
  }

  get airports(): AbstractControl {
    return this.form.get('airports')!;
  }

  get countries(): AbstractControl {
    return this.form.get('countries')!;
  }
}
