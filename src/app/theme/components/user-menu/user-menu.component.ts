import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Thông tin cá nhân', icon: 'pi pi-user-edit', routerLink: '/profile'},
      {label: 'Đổi mật khẩu', icon: 'pi pi-user-edit', routerLink: '/changePassword'},
      {label: 'Đăng xuất', icon: 'pi pi-sign-out', routerLink: '/logout'},
    ];
  }
}
