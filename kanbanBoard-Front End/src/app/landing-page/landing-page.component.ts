import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare let AOS: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  someSubscription: any;
  constructor() {
  
   
  }

  ngOnInit(): void {
    AOS.init({
      offset: 200,
      duration:800,
 
    });

  
  
  }



}
