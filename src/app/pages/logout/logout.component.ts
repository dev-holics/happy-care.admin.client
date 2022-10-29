import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/_services/accounts.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(public accountService: AccountsService, public router:Router,) { }

  ngOnInit(): void {
    this.accountService.logout();
    this.router.navigate(['/login'])
  }
}
