import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().then(response => {
      if (response) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }


}
