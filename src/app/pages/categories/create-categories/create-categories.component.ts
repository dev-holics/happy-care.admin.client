import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreateUpdate, CategoryOptions } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/_services/categories.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {

  category: CategoryCreateUpdate = new CategoryCreateUpdate();
  parentCategories: CategoryOptions[] = []
  loading = false;
  submitted = false;
  inputChanged = false;
  public form: FormGroup;

  constructor(
    public categoryService: CategoriesService,
    public alertService: NotificationService,
    public fb: FormBuilder,
    ) {
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
        'parentId': [null, Validators.compose(
          [
          ])],
        'order': [null],
        'images': [null]
        });
    }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.parentCategories = response;
      }
    )
  }
  public onSubmit(values:Object) : void {
    this.submitted = true;
    this.loading = true;
    if (this.form.valid) {
      this.category.name = this.form.value.name;
      this.category.description = this.form.value.description;
      this.category.parentId = this.form.value.parentId;
      this.category.order = 10;
      this.category.images = [];
      this.categoryService.create(this.category).subscribe(
        (response) => {
          this.loading = false;
          this.alertService.showSuccess(response.message, "");
        },
        (error) => {
          this.alertService.showError(error.error.errors[0].message, "");
          this.loading = false;
        },
      );}
  }
}
