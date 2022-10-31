import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Origin } from '../../origins/origin.model';
import { Trademark } from '../trademark.model';

@Component({
  selector: 'app-trademark-dialog',
  templateUrl: './trademark-dialog.component.html',
  styleUrls: ['./trademark-dialog.component.scss']
})
export class TrademarkDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('origins') origins: Origin[];
  @Input('trademark') trademark: Trademark;
  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder) { 
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      originId: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if(this.trademark) {
      this.form.patchValue(this.trademark);
    } else {
      this.trademark = new Trademark();
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(trademark): void {
    if(trademark) {
      this.closeDialog.emit(trademark);
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }
}
