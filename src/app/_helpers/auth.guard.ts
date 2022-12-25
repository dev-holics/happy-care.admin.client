import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import decode from 'jwt-decode';

import { AccountsService } from '../_services/accounts.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountsService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.accountService.currentUserValue;
        if (currentUser) {
            const tokenPayload:any = decode(currentUser.accessToken)
            if (route.data.permission) {
              const filteredPermission = tokenPayload.role.permissions
                .some((permission) => permission.name == route.data.permission)
              if (filteredPermission) {
                return true;
              }
              this.router.navigate(['/']);
              return false;
            }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class ProductGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountsService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.accountService.currentUserValue;
        console.log(currentUser);
        console.log(route.data);
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
