import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialExampleModule } from 'material-example.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationModule } from './registration/registration.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    RegistrationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    NgxHideOnScrollModule
  ]
  ,
  providers: []
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
