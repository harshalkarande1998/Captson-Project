import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../classes/email';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {

  constructor(private httpClient:HttpClient) { }


  
  notificationURL:String="http://localhost:9000/"
  


  sendNotifications(email:Email)
  {
    return this.httpClient.post
    (
      this.notificationURL+"notifications",email,{responseType:'text'}
    )
  }





}

