import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch, BranchCreateUpdate, City, District } from 'src/app/_models/branch';
import { BranchsService } from 'src/app/_services/branches.service';

@Component({
  selector: 'app-branches-dialog',
  templateUrl: './branches-dialog.component.html',
  styleUrls: ['./branches-dialog.component.scss']
})
export class BranchesDialogComponent implements OnInit {

  @Input('display') display: boolean;
  @Input('Cities') cities: City[];
  @Input('Branch') branch: Branch;
  @Input('Id') id: string;
  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;
  submitted = false;
  public districts: District[];
  constructor(
    public fb: FormBuilder,
    public branchService: BranchsService) {
    this.form = this.fb.group({
      'address': [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(512)
        ])],
      'cityId': [null, Validators.compose(
        [
          Validators.required,
        ]
      )],
      'districtId': [null, Validators.compose(
        [
          Validators.required,
        ])],
      });
  }

  ngOnInit(): void {
    if(this.id) {
      this.branchService.getBranchById(this.id).subscribe(
        (response: any) => {
          this.branchService.getDistrictsByCityId(response.data.district?.city?.id).subscribe(
            (response: any) => {
              this.districts = response.data;
            }
          )
          this.form.patchValue({
            address: response.data.address,
            cityId: response.data.district?.city?.id,
            districtId: response.data.district?.id,
          })
        }
      )
    } else {
      this.branch = new Branch();
    }
  }

  cityOnChange(event): void {
    this.districts = [];
    this.branchService.getDistrictsByCityId(event.value).subscribe(
      (response: any) => {
        this.districts = response.data;
      }
    )
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(branch: BranchCreateUpdate | null): void {
    if(branch) {
      this.closeDialog.emit({id: this.id, branch});
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }

}
