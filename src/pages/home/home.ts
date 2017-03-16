/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';

import { ItemPage } from "../item/item";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  user:any;
  submitted:boolean = false;
  loginForm:FormGroup;
  storeInfo:Observable<AppStateI>;
  credentials:{ email?: string, password?: string } = {};

  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public mainActions: MainActions,
    private store: Store<AppStateI>) {

    // use the object in the template since it is an observable
    this.storeInfo = this.store.select(state => state)//.map((currentState: AppStateI)  => {return currentState.currentUser})

    // here we are monitoring the authstate to do initial load of data
    this.storeInfo.subscribe((currentState: AppStateI) => {
      if (currentState.currentUser !== null && !currentState.dataArray && currentState.loading === false) {
        this.user = currentState.currentUser.auth;
        this.doQuery()
      }
    });
  }


  ngOnInit() {
    this.store.dispatch(this.mainActions.checkAuth());
  }

  ionViewWillUnload() {
    //this.storeInfo.complete();
  }


  doLogout():void {
    this.store.dispatch(this.mainActions.logout());
  }

  doLogin(_credentials):void {
    this.submitted = true;
    if (_credentials.valid) {
      this.store.dispatch(this.mainActions.login( _credentials));
    }
  }


  doCreateUser(_credentials):void {
    this.submitted = true;

    if (_credentials.valid) {
      this.store.dispatch(this.mainActions.create_user( _credentials));
    }
  }

  doQuery():void {
    this.store.dispatch(this.mainActions.get_fb_array('userContact/'+this.user.uid));
  }

  // doItemQuery
  doItemQuery(_item):void {
      this.navCtrl.push(ItemPage, { itemId: _item.$key, uid: this.user.uid})
      console.log('doItemQuery-> ', _item)
  }
}
