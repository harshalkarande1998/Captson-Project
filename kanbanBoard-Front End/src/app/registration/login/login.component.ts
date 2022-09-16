import { HttpStatusCode } from '@angular/common/http';
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendRegistrationService } from 'src/app/services/backend-registration.service';
import { GoogleOauthService } from 'src/app/services/google-oauth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, AfterViewInit,  AfterViewChecked{
  // isLoggedIn:boolean = false;

isLoading:boolean=false;

  signUp:FormGroup= new FormGroup({
    "email": new FormControl("",[Validators.required, Validators.pattern("^[a-zA-Z0-9_.-]+[@][a-z]+[.][a-zA-Z0-9.-]+$")]),
    "password": new FormControl("",[Validators.required, Validators.pattern("^(?=.*[0-9])"
                                                                        + "(?=.*[a-z])(?=.*[A-Z])"
                                                                        + "(?=.*[@#$%^&+=])"
                                                                        + "(?=\\S+$).{8,20}$")])
  })



  get userEmail():AbstractControl<any,any>|null{
    return this.signUp.get("email");
  }
  get userPassword():AbstractControl<any,any>|null{
    return this.signUp.get("password");
  }



// *********** contructor ************
  constructor(
    private login:BackendRegistrationService, 
    private router:Router,
    private googleAuth:GoogleOauthService,
    private snackbarService:SnackbarService
   ) {
   
    
   }

   isLoadingChnge(){
    this.isLoading=true;
    console.log("is loading changes"+this.isLoading)
   }


  submitSignIn(data:any)
  {
    this.login.loginUser(data).subscribe({
      next: message=>{
        this.isLoading=false;
        console.log("loading changes after response"+this.isLoading)
        sessionStorage.setItem("token",message.token)
        sessionStorage.setItem("email", data.email)
        this.snackbarService.openSnackBar('Logged in Successfully','Dismiss')
        this.login.isLoggedIn=true;
        this.router.navigateByUrl("dashboard")
        console.log(sessionStorage.getItem("token"));
        


      },
      error: err=>{
        this.isLoading=true;
          console.log("some error occurred");
          console.log(err.message);
          console.log(err.status);
          setTimeout (() => {
            this.isLoading=false;
            this.snackbarService.openSnackBar('Login failed','Dismiss')
         }, 2000);
          
          // alert("Login failed.")
        //   this.login.isLoggedIn=true;
        // this.router.navigateByUrl("dashboard")

      }
    })
    
    console.log(data);
  }


  ngOnInit(): void {
  }


  ngAfterViewChecked(): void {
    console.log(this.signUp.untouched);
    
      this.login.isTouched=this.signUp.untouched
  }

 


  ngAfterViewInit(): void {
      
    google.accounts.id.initialize({
      client_id: "18467521300-shpfsfq4ihvf9709kkad26bpnnvfk14h.apps.googleusercontent.com",
      callback: (response: any) =>
       this.handleGoogleSignIn(response)
      // this.signUpWithGoogle()
    }
    );
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { size: "large", type: "button", shape: "pill", onClick:"signUpWithGoogle()" ,
      style: "text-align:center"
    }  // customization attributes
    );

  }


moveToLandingPage(){
 
  this.router.navigateByUrl("").then(onNav=>{
    if(onNav)
    {
      window.location.reload()
    }
  })
}


  moveToRegister()
  {
    this.router.navigateByUrl("register").then(onNav=>{
      if(onNav)
      {
        window.location.reload()
      }
    })

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
    // this.register.isRegistered=true

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

        this.snackbarService.openSnackBar("Successfully logged in","Dismiss")

        // this.snackbarService.openSnackBar('Logged in Successfully','Dismiss')

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
          this.snackbarService.openSnackBar("User is already registered, cannot register with google again","Dismiss")
        }
        else{
          // alert("some internal error occurred")
          this.snackbarService.openSnackBar("some internal error occurred","Dismiss")
        }
      }
    })
  }

}
