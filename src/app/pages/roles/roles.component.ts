import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/_models/role';
import { RolesService } from 'src/app/_services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  p: number = 1;

  constructor(public rolesService: RolesService) { }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles() : void {
    this.rolesService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      }
    )
  }

  key = 'name';
  reverse: boolean = false;
  Sort(key:string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
