import { Component, OnInit } from '@angular/core';
import { Origin } from './origins.model';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.scss'],
})
export class OriginsComponent implements OnInit {
  public displayDialog: boolean;
  public originData: Origin;

  constructor() {}

  ngOnInit(): void {}

  public addOrigin(origin: Origin){
    console.log(origin);
  }
  public updateOrigin(origin: Origin) {
    console.log(origin);
  }

  showDialog() {
    this.displayDialog = true;
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if(data) {
      (data.id) ? this.updateOrigin(data) : this.addOrigin(data);
    }
  }
}
