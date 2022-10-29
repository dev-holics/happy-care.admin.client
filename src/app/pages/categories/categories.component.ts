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
  filteredCategories: Category[] = []
  keyword: any;
  p: number = 1;
  constructor(public categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;
        this.filteredCategories = response;
      },
      (error) => {console.error(error);},
    )
  }
  Search() {
    if (this.keyword == "") {
      this.fetchCategories();
    }
    else {
      this.filteredCategories = this.categories.filter(res => {
        return res.name.toLowerCase().match(this.keyword.toLowerCase());
      })
    }
  }

  key = 'name';
  reverse: boolean = false;
  Sort(key:string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
