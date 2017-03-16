/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import { AngularFire, AuthProviders, AuthMethods, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import firebase from 'firebase';

import { MainActions } from "../store/actions/mainActions";

const FIREBASE_AUTH_CONFIG = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(
    public af: AngularFire,
    public auth$: AngularFireAuth
  ) {
  }

  // FireAuth Methodes
  loginUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
      return this.af.auth.login({ email: newEmail,   password: newPassword });
  }

  resetPassword(email: string): firebase.Promise<any> {
      return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
      return this.af.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
      return this.af.auth.createUser({ email: newEmail, password: newPassword });
  }


  //
  doAuth(_creds):Observable<any> {
      return Observable.create((observer) => {
          this.auth$.login(_creds, FIREBASE_AUTH_CONFIG)
            .then((_result:FirebaseAuthState) => {
                console.log("_result", _result)
                return observer.next({ type: MainActions.LOGIN_SUCCESS, payload: _result })
            }, (error) => {
                console.log("error", error)
                return observer.next({ type: MainActions.LOGIN_FAILED, payload: error })
            })
      })
  }

  doCreateUser(_creds):Observable<any> {
      return Observable.create((observer) => {
          this.auth$.createUser(_creds).then((_result:FirebaseAuthState) => {
              console.log("_result", _result)
              return observer.next({ type: MainActions.CREATE_USER_SUCCESS, payload: _result })
          }, (error) => {
              console.log("error", error)
              return observer.next({ type: MainActions.CREATE_USER_FAILED, payload: error })
          })
      })
  }

}
