import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/_services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []
  constructor(public categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {console.error(error);},
    )
  }

}
