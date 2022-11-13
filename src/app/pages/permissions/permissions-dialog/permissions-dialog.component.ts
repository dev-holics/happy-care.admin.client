import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleOption } from 'src/app/_models/permissions';
import { PermissionsService } from 'src/app/_services/permissions.service';

@Component({
  selector: 'app-permissions-dialog',
  templateUrl: './permissions-dialog.component.html',
  styleUrls: ['./permissions-dialog.component.scss']
})
export class PermissionsDialogComponent implements OnInit {

  @Input('display') display: boolean;
  @Input('modules') modules: ModuleOption[];
  @Input('Id') id: string;
  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder, public permissionService: PermissionsService) {
    this.form = this.fb.group({
      'name': [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(512)
        ])],
      'module': [null, Validators.compose(
        [
          Validators.required,
        ]
      )],
      'description': [null],
      });
  }

  ngOnInit(): void {
    if(this.id) {
      this.permissionService.getPermissionById(this.id).subscribe(
        (response: any) => {
          this.form.patchValue({
            name: response.name,
            module: response.module,
            description: response.description,
          })
        }
      )
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(permission: any): void {
    if(permission) {
      this.closeDialog.emit({id: this.id, permission});
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }
}
