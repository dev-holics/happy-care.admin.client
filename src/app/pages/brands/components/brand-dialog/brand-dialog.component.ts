import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OriginModel } from '../../../origins/models/origin.model';
import { BrandModel } from '../../models/brand.model';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('origins') origins: OriginModel[];
  @Input('brand') brand: BrandModel;
  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;

  constructor(public fb: FormBuilder) { 
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      originId: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if(this.brand) {
      this.form.patchValue(this.brand);
    } else {
      this.brand = new BrandModel();
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(brand): void {
    if(brand) {
      this.closeDialog.emit(brand);
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }
}
