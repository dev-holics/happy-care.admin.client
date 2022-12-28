import { Component, Input, OnInit } from '@angular/core';
import { CityModel, DistrictModel } from 'src/app/pages/branches/models/branch.model';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DropdownControl, TextboxControl } from 'src/app/shared/models/question-control.model';

@Component({
  selector: 'app-branch-dialog',
  templateUrl: './../../../../shared/components/base-dialog/base-dialog.component.html',
  styleUrls: ['./../../../../shared/components/base-dialog/base-dialog.component.scss']
})
export class BranchDialogComponent extends BaseDialogComponent implements OnInit {

  @Input('cities') cities: CityModel[];
  @Input('districts') districts: DistrictModel[];

  public districtOptions: DistrictModel[];

  override ngOnInit(): void {
    this.districtOptions = [...this.districts];
    if (this.model.district) {
      this.model.district.cityId = this.model.district.city.id;
    }
    super.ngOnInit();
    this.title = "chi nhánh";
    this.style = {
      width: '30vw'
    }
  }

  override createFormQuestions(): void {
    const questions = [
      new DropdownControl({
        key: 'cityId',
        label: 'Tỉnh/Thành phố',
        options: this.cities,
        optionLabel: 'name',
        optionValue: 'id',
        value: this.model.district? this.model.district.cityId : '',
        onChange: async (event) => {
          let cityId = event.value;
          if (cityId == null) {
            console.log('null');
            this.districtOptions = [...this.districts];
          } else {
            this.districtOptions = this.districts.filter(d => d.cityId == cityId);
          }    
          console.log(this.districtOptions);      
          this.questions[1].options = this.districtOptions;
        }
      }),
      new DropdownControl({
        key: 'districtId',
        label: 'Quận/Huyện',
        options: this.districtOptions,
        optionLabel: 'name',
        optionValue: 'id',
        value: this.model.district? this.model.district.id : '',
        validates: {
          required: true
        }
      }),
      new TextboxControl({
        key: 'address',
        label: 'Địa chỉ',
        value: this.model.address || '',
        validates: {
          required: true
        }
      })
    ]
    this.questions = questions;
  }

}
