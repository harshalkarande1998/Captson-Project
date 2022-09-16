import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardCheckGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let token:string|null=sessionStorage.getItem('token')
        
    if(token!=null && token!=undefined && token!=""){
      // alert('calling valid activate check')
      return true
    }
    else{
      // alert('calling invalid activate check')
    this.router.navigateByUrl("login")
    return false
    }
  }
  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     let token=sessionStorage.getItem('token')
        
  //       if(token!=null || token!=undefined || token!=""){
  //         return true
  //       }
  //       this.router.navigateByUrl("login")
  //       return false
      
  // }
  
}
