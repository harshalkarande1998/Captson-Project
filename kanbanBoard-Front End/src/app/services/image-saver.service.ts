import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageSaverService {
  url:string = "http://localhost:5000/images"
  email:string = sessionStorage.getItem("email") as string;
  getImage()
  {
  return this.http.get<any>(this.url+"/"+this.email);
  }
  addImage(image:string)
  {
   
    let imageObj:any={
      id:this.email,
      "image":image
    }

    return this.http.post<any>(this.url,imageObj)
  }
  updateImage(image:string)
  {
    let imageObj:any={
      id:this.email,
      "image":image
    }
    return this.http.put<any>(this.url+"/"+this.email,imageObj)

  }
  constructor(private http:HttpClient) { }
}
