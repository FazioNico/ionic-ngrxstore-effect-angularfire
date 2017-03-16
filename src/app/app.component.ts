/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Routes } from './app.routes';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


  ngOnInit() {
     console.log ("OnInit " +  this.rootPage)
     this.rootPage = Routes.getRootPage(false);

  }
}
