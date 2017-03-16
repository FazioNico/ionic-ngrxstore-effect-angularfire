/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class MainActions {

  static LOGIN:string = "LOGIN";
  login(_credentials ): Action {
      return <Action>{
          type: MainActions.LOGIN,
          payload: _credentials.value
      }
  }
  static LOGIN_SUCCESS:string = "LOGIN_SUCCESS";
  static LOGIN_FAILED:string = "LOGIN_FAILED";
  static LOGOUT:string = "LOGOUT";
  logout(): Action {
      return <Action>{
          type: MainActions.LOGOUT,
      }
  }
  static LOGOUT_SUCCESS:string = "LOGOUT_SUCCESS";
  static LOGOUT_FAILED:string = "LOGOUT_FAILED"

  static CREATE_USER:string = "CREATE_USER";
  create_user(_credentials ): Action {
      return <Action>{
          type: MainActions.CREATE_USER,
          payload: _credentials.value
      }
  }
  static CREATE_USER_SUCCESS:string = "CREATE_USER_SUCCESS";
  static CREATE_USER_FAILED:string = "CREATE_USER_FAILED"

  static GET_FIREBASE_ARRAY:string = "GET_FIREBASE_ARRAY";
  get_fb_array(dbPath:string){
    return <Action>{
        type: MainActions.GET_FIREBASE_ARRAY,
        payload: { path: dbPath }
    }
  }
  static GET_FIREBASE_ARRAY_SUCCESS:string = "GET_FIREBASE_ARRAY_SUCCESS";
  static GET_FIREBASE_ARRAY_FAILED:string = "GET_FIREBASE_ARRAY_FAILED"

  static GET_FIREBASE_OBJECT:string = "GET_FIREBASE_OBJECT";
  static GET_FIREBASE_OBJECT_SUCCESS:string = "GET_FIREBASE_OBJECT_SUCCESS";
  static GET_FIREBASE_OBJECT_FAILED:string = "GET_FIREBASE_OBJECT_FAILED"

  static CHECK_AUTH:string = 'CHECK_AUTH';
  checkAuth(): Action {
      return <Action>{
          type: MainActions.CHECK_AUTH,
      }
  }

  static CHECK_AUTH_SUCCESS:string = 'CHECK_AUTH_SUCCESS';
  static CHECK_AUTH_FAILED:string = "CHECK_AUTH_FAILED";
  static CHECK_AUTH_NO_USER:string = 'CHECK_AUTH_NO_USER';

}
