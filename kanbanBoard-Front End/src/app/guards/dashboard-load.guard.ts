import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendRegistrationService } from '../services/backend-registration.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardLoadGuard implements CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // alert("checking access")
    
        // return true
        let token=sessionStorage.getItem('token')
        
        if(token!=null || token!=undefined || token!=""){
          return true
        }
        this.router.navigateByUrl("login")
        return false
        

        // if(!this.service.isLoggedIn)
        // {
        //   this.router.navigateByUrl("login")
        // }

    // return  this.service.isLoggedIn;
  }
  constructor(private service:BackendRegistrationService, private router:Router){}
}
