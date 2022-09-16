import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendRegistrationService {
  // token:String=""
  isLoggedIn:boolean = false;
  isRegistered:boolean = false;
  isTouched:boolean=false;
  loginUrl:string = "http://localhost:9000/authenticate/login"
  registerUrl:string = "http://localhost:9000/user/register"
  constructor(private httpClient:HttpClient) { }

  loginUser(data:any):Observable<any>
  {
    return this.httpClient.post(this.loginUrl,data);
  }
  registerUser(data:any)
  {
      return this.httpClient.post(this.registerUrl,data);
  }

}
