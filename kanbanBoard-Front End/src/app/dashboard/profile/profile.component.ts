import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackendBoardService } from 'src/app/services/backend-board.service';
import { ImageSaverService } from 'src/app/services/image-saver.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails!:any
  imageUrl:string = "../../../assets/profile.webp"
  imageMessage:string = "";
  constructor(private backend: BackendBoardService, private imageStore:ImageSaverService) { 
    this.backend.getUserDetails().subscribe({
      next: data=>{
        this.userDetails=data
      }
    })
    this.getImage()
    // this.userDetails = {
    //   "email":  "test@user.com",
    //   "firstName": "test",
    //   "lastName": "user",
    //   "phoneNumber": 1234567890
    // }
  }
  onImageAdd(event:any){
    console.log(event);
    
    if(!event.target.files[0]||event.target.files[0].length==0)
    {
      this.imageMessage="Please add an image"
      return 
    }
    if(event.target.files[0].type.match(/image\/*/)==null)
    {
      this.imageMessage="only images are allowed"
      return
    }
    var reader = new FileReader();reader.readAsDataURL(event.target.files[0])

    reader.onload = (_event)=>{
      this.imageMessage=""
      if(this.imageUrl=="../../../assets/profile.webp")
      {
        this.imageUrl=reader.result as string;
        this.imageStore.addImage(this.imageUrl).subscribe(res=>{
          console.log("image added");
          
        })
      }
      else{
        this.imageUrl=reader.result as string;
        this.imageStore.updateImage(this.imageUrl).subscribe(res=>{
          console.log("image updated");
          
        })
      }
   
    }
  }
  getImage()
  {
    this.imageStore.getImage().subscribe({
      next:res=>{
        console.log(res);
        
        let fromServerImg = res.image;
        if(fromServerImg==undefined||fromServerImg==null||fromServerImg=="")
        {
          
        }
        else{
          this.imageUrl= fromServerImg
        }
        
      }
    })
  }
  ngOnInit(): void {
    
  }

}
