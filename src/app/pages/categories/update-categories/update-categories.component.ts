import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreateUpdate, CategoryOptions } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/_services/categories.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss']
})
export class UpdateCategoriesComponent implements OnInit {

  category: CategoryCreateUpdate = new CategoryCreateUpdate();
  parentCategories: CategoryOptions[] = []
  loading = false;
  submitted = false;
  inputChanged = false;
  id: string;
  public form: FormGroup;

  constructor(
    public categoryService: CategoriesService,
    public alertService: NotificationService,
    public fb: FormBuilder,
    private route: ActivatedRoute
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
        'images': [[]]
        });
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams?.id;
    this.categoryService.getCategoriesById(this.id).subscribe(
      (response) => {
        this.category = response[0];
      }
    )
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.parentCategories = response;
      }
    )
    this.form.valueChanges.subscribe((currentValue) => {
      console.log(_.omit(this.category, ['slug','id', 'isActive', 'children', 'createdAt', 'deletedAt', 'updatedAt', 'isActive']));
      console.log(_.omit(currentValue));
      if (!_.isEqual(_.omit(currentValue), _.omit(this.category, ['slut', 'id', 'isActive', 'children', 'createdAt', 'deletedAt', 'updatedAt', 'isActive']))) {
        this.inputChanged = true;
      } else {
        this.inputChanged = false;
      }
    });
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
