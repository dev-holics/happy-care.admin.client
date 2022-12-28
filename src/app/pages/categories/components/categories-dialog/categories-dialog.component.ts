import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel, CategoryCreateUpdate, CategoryOptions } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/pages/categories/services/categories.service';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {

  @Input('display') display: boolean;
  @Input('Categories') categories: CategoryOptions[];
  @Input('Category') category: CategoryModel;
  @Input('Id') id: string;
  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;
  submitted = false;
  constructor(
    public fb: FormBuilder,
    public categoryService: CategoriesService) {
    this.form = this.fb.group({
      'name': [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(512)
        ])],
      'description': [null, Validators.compose(
        [
          Validators.maxLength(1024),
        ])],
      'parentId': [null],
      'order': [0],
      'images': [[]]
      });
  }

  async ngOnInit(): Promise<void> {
    if(this.id) {
      const response = await this.categoryService.getCategoriesById(this.id);
      this.form.patchValue({
        name: response.data.name,
        description: response.data.description,
        order: response.data.order,
        parentId: response.data.parent?.id,
      })
      this.categories = [];
      if (response.data.parent) {
        this.categories.push(new CategoryOptions(response.data.parent.id, response.data.parent.name))
      }
    } else {
      this.category = new CategoryModel();
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(category: CategoryCreateUpdate | null): void {
    if(category) {
      this.closeDialog.emit({id: this.id, category});
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }

}
