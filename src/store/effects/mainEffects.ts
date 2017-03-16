/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from "@ngrx/effects";

import { AngularFireAuth, AngularFire, FirebaseAuthState } from 'angularfire2';

import { MainActions } from '../../store/actions/mainActions';
import { AuthService } from "../../providers/auth-service";
import { DatasService } from "../../providers/datas-service";

@Injectable()
export class MainEffects {

    constructor(
      private action$: Actions,
      public af: AngularFire,
      public auth$: AngularFireAuth,
      private _auth:AuthService,
      private _database: DatasService
    ) {
    }

    @Effect() checkAuth$ = this.action$
        // Listen for the 'CHECK_AUTH' action
        .ofType(MainActions.CHECK_AUTH)
        .switchMap<Action, FirebaseAuthState>(() => this.af.auth)
        .take<FirebaseAuthState>(1)
        .map<FirebaseAuthState, Action>((_result:FirebaseAuthState) => {
            if (_result) {
                console.log("Firebase auth result-> ", _result)
                return <Action>{ type: MainActions.CHECK_AUTH_SUCCESS, payload: _result }
            } else {
                return <Action>{ type: MainActions.CHECK_AUTH_NO_USER, payload: null }
            }

        }).catch((res: any) => Observable.of({ type: MainActions.CHECK_AUTH_FAILED, payload: res }))

    @Effect() logout$ = this.action$
        // Listen for the 'LOGOUT' action
        .ofType(MainActions.LOGOUT)
        .switchMap<Action, any>(() => this.auth$.logout())
        // If successful, dispatch success action with result
        .map((res: Observable<any>) => ({ type: MainActions.LOGOUT_SUCCESS, payload: null }))
        // If request fails, dispatch failed action
        .catch((res: any) => Observable.of({ type: MainActions.LOGOUT_FAILED, payload: res }))


    @Effect() login$ = this.action$
        // Listen for the 'LOGIN' action
        .ofType(MainActions.LOGIN)
        .map<Action, any>(toPayload)
        .switchMap((payload:Observable<any>) => {
            console.log("in login$", payload)
            return this._auth.doAuth(payload)
        })


    @Effect() createUser$ = this.action$
        // Listen for the 'CREATE_USER' action
        .ofType(MainActions.CREATE_USER)
        .map<Action, any>(toPayload)
        .switchMap((payload:Observable<any>) => {
            console.log("in createUser$", payload)
            return this._auth.doCreateUser(payload)
        })


    @Effect() getFBArray$ = this.action$
        // Listen for the 'GET_FIREBASE_ARRAY' action
        .ofType(MainActions.GET_FIREBASE_ARRAY)
        .map<Action, any>(toPayload)
        .switchMap((payload:Observable<any>) => {
            return this._database.getFBArray(payload)
        })


    @Effect() getFBObject$ = this.action$
        // Listen for the 'GET_FIREBASE_OBJECT' action
        .ofType(MainActions.GET_FIREBASE_OBJECT)
        .map<Action, any>(toPayload)
        .switchMap((payload:Observable<Object>) => {
            return this._database.getFBObject(payload)
        })

}
