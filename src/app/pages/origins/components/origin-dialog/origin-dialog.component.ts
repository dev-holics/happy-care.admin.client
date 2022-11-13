import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OriginModel } from '../../models/origin.model';

@Component({
  selector: 'app-origin-dialog',
  templateUrl: './origin-dialog.component.html',
  styleUrls: ['./origin-dialog.component.scss'],
  providers: [FormBuilder]
})
export class OriginDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('origin') originData: OriginModel;
  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])], 
    });
  }

  ngOnInit(): void {
    if(this.originData) {
      this.form.patchValue(this.originData);
    } else {
      this.originData = new OriginModel();
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(origin): void {
    if(origin) {
      this.closeDialog.emit(origin);
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }
}
