import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import {google}  from 'googleapis';

@Injectable({
  providedIn: 'root'
})
export class GoogleOauthService {
  url:string = "http://localhost:9000/googleLogin/register"

 
  signIn(user:any):Observable<any>
  {
    return this.httpClient.post(this.url,user);
  }
  constructor(private httpClient:HttpClient) { }
}
