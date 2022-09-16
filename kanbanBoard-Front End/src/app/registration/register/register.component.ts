
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendRegistrationService } from 'src/app/services/backend-registration.service';
import { GoogleOauthService } from 'src/app/services/google-oauth.service';
import { HttpStatusCode } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
declare var google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,AfterViewInit ,AfterViewChecked{
  

// ********** Contructor **********
  constructor(
    private register:BackendRegistrationService, 
    private router:Router, 
    private googleAuth:GoogleOauthService,
    private login:BackendRegistrationService,
    private snackbarService:SnackbarService) {

    }
//************ Variable Declaration ************ 

    isLoading:boolean=false;
     
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "18467521300-shpfsfq4ihvf9709kkad26bpnnvfk14h.apps.googleusercontent.com",
      callback: (response: any) =>
       this.handleGoogleSignIn(response)
    }
    );
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "button", shape: "pill", onClick:"signUpWithGoogle()" ,
      style: "text-align:center"
    }  // customization attributes
    );
  }
  
  ngOnInit(): void {
    // window.location.reload()
    console.log(this.userDetails.untouched);
    
  }
  ngAfterViewChecked(): void {
    console.log(this.userDetails.untouched);
    this.login.isTouched=this.userDetails.untouched
      
  }

  handleGoogleSignIn(response: any) {
    console.log(response.credential);

    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload));
    let googleUser:any = JSON.parse(jsonPayload)
    this.register.isRegistered=true

    // this.router.navigate(["dashboard"])
    let userToRegister:any={
        "email": googleUser.email,
        "firstName": googleUser.given_name,
        "lastName":googleUser.family_name,
        "password": "",
        "boards":[]
    }
    console.log("user details to be registered");
    console.log(userToRegister);
    this.googleAuth.signIn(userToRegister).subscribe({
      next: data=>{
        sessionStorage.setItem("token",data.token)
        sessionStorage.setItem("email", userToRegister.email)
        // alert("Successfully logged in")
        this.snackbarService.openSnackBar('Logged in Successfully','Dismiss')
        this.login.isLoggedIn=true;
        this.router.navigateByUrl("dashboard").then(onNav=>{
          if(onNav)
          {
            
             window.location.reload()
          }
        })
      },
      error: err=>{
        if(err.statusCode==HttpStatusCode.Conflict)
        {
          // alert("User is already registered, cannot register with google again")
          this.snackbarService.openSnackBar('User already registered, cannot register with google again','Dismiss')
        }
        else{
          // alert("some internal error occurred")
          this.snackbarService.openSnackBar('Error Occured, Please try after some time','Diasmiss')
        }
      }
    })
  }
 
  isLoadingChnges(){
    this.isLoading=true;
  }

  onSubmit(data :any){
    data.boards=[];
    console.log(data);
    this.register.isRegistered=true
    this.register.registerUser(data).subscribe({
      next: message=>{
        console.log(message);
        this.isLoading=false;
        // alert("Registered successfully")
        this.snackbarService.openSnackBar('Registered successfully','Dismiss')
        this.router.navigateByUrl("login")
      },
      error: err=>{

        // alert("error registering user")
        // this.router.navigateByUrl("login")
        setTimeout (() => {
          this.isLoading=false;
          this.snackbarService.openSnackBar('Error registering user, Try after some time','Dismiss')
       }, 2000);
        
      }
    })

  }

  userDetails=new FormGroup({
    email:new FormControl("",[
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9_.-]+[@][a-z]+[.][a-zA-Z0-9.-]+$")
    ]),
    password:new FormControl("",[
      Validators.required,
      Validators.pattern("^(?=.*[0-9])"
                        + "(?=.*[a-z])(?=.*[A-Z])"
                        + "(?=.*[@#$%^&+=])"
                        + "(?=\\S+$).{8,20}$")
    ]),
    firstName:new FormControl("",[
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName:new FormControl("",[
      Validators.required,
      Validators.minLength(3)
    ]),
    phoneNumber:new FormControl("",[
        Validators.required,
        Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
      ])

  })
  get userDetailsContent(){
    return this.userDetails.controls;
  }


  moveToLandingPage(){
 
    this.router.navigateByUrl("").then(onNav=>{
      if(onNav)
      {
        window.location.reload()
      }
    })
  }
  

}

