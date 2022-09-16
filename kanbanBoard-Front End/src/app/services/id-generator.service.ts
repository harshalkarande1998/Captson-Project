import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor(private httpClient:HttpClient) { }

  idGeneratorURL:String="http://localhost:9000/"

  getId(){
    return this.httpClient.post
    (
      this.idGeneratorURL+"generate",{name:"Test"}
    )
  }
}
