import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(): boolean {
    if (this.apiService.isLoggedIn()) {
      return true;
    } else {
      console.log('AuthGuard: User is not logged in. Redirecting to /welcome');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
