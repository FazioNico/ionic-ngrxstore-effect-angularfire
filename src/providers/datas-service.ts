/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   16-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseObjectObservable, /*FirebaseListObservable*/ } from 'angularfire2';

import { MainActions } from '../store/actions/mainActions';

/*
  Generated class for the DatasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatasService {

  constructor(private _af: AngularFire) {
  }

  getFBArray(_params):Observable<any> {
    //console.log('Firebase-> Load data as Array: ' , _params.path);
    return Observable.create((observer) => {
      let ref:FirebaseObjectObservable<any> = this._af.database.object(_params.path)
      ref.flatMap(() => this._af.database.list(_params.path))
          .take(1)
          .subscribe(items => {
              observer.next({ type: MainActions.GET_FIREBASE_ARRAY_SUCCESS, payload: items })
          }, (error) => {
              console.log(' ERROR: ' + error);
              observer.next({ type: MainActions.GET_FIREBASE_ARRAY_FAILED, payload: error })
          })
    })
  }

  getFBObject(_params):Observable<any> {
      //console.log('Firebase-> Load data as Object: ' , _params.path);
      return Observable.create((observer) => {
          let ref:FirebaseObjectObservable<any> = this._af.database.object(_params.path)
          ref.flatMap(() => <FirebaseObjectObservable<any>>this._af.database.object(_params.path))
              .take(1)
              .subscribe(items => {
                  observer.next({ type: MainActions.GET_FIREBASE_OBJECT_SUCCESS, payload: items })
              }, (error) => {
                  console.log(' ERROR: ' + error);
                  observer.next({ type: MainActions.GET_FIREBASE_OBJECT_FAILED, payload: error })
              })
      })
  }
}
