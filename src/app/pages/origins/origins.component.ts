import { Component, OnInit } from '@angular/core';
import { Origin } from './origin.model';
import { OriginsService } from './origins.service';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrls: ['./origins.component.scss'],
  providers: [OriginsService]
})
export class OriginsComponent implements OnInit {
  public displayDialog: boolean;
  public originData: Origin;
  public origins: Origin[] | null;

  constructor(public originsService: OriginsService) {}

  ngOnInit(): void {
    this.getOrigins();
  }

  public getOrigins(): void {
    this.origins = null; //for show spinner each time
    this.originsService.getOrigins().subscribe((origins) => {
      console.log(origins);
      this.origins = origins;
    });
  }

  public addOrigin(origin: Origin) {
    this.originsService.addOrigin(origin).subscribe(origin => this.getOrigins());
  }

  public updateOrigin(origin: Origin) {
    console.log(origin);
  }

  showDialog() {
    this.displayDialog = true;
  }

  onHideDialog(data): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateOrigin(data) : this.addOrigin(data);
    }
  }
}
