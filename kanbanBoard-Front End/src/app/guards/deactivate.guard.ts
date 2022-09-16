import { Injectable } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../registration/login/login.component';
import { RegisterComponent } from '../registration/register/register.component';
import { BackendRegistrationService } from '../services/backend-registration.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<LoginComponent | RegisterComponent> {
  canDeactivate(
    component: LoginComponent | RegisterComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("checking deactivate");
      if(((currentRoute.component==LoginComponent) && !this.registration.isLoggedIn && !this.registration.isTouched)
      ||((currentRoute.component==RegisterComponent) && !this.registration.isRegistered && !this.registration.isTouched)
      
      )
      {
        return window.confirm("Unsaved data may be lost")
      }
      // if(currentRoute.component==LoginComponent&&component)
      //  {
         
      //   }
      return true;
  }
  constructor(private registration:BackendRegistrationService){}
}
