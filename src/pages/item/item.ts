/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   16-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';
/*
  Generated class for the Item page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  storeInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mainActions: MainActions,
    private store: Store<AppStateI>
  ) {
    // use the object in the template since it is an observable
    this.storeInfo = this.store.select(state => state);

    this.storeInfo.subscribe((data: any) => {
      console.log("mainAppStoreReducer store changed-> ", data)

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StuffDetailPage');
    let itemId:string = this.navParams.get('itemId');
    let uid:string = this.navParams.get('uid');

    this.store.dispatch(this.mainActions.get_fb_object(`userContact/${uid}/${itemId}`));
  }

  ionViewWillUnload() {
    this.storeInfo.complete();
  }

}
