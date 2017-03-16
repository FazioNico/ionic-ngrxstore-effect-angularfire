/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { ActionReducer, Action } from "@ngrx/store";

import { AppStateI } from "../app-stats";
import { MainActions } from '../actions/mainActions';

export const intitialState:AppStateI = {
  authChecked: false,
  currentUser: null,
  loading: false
}

export const mainAppStoreReducer:ActionReducer<AppStateI> =
  (state:AppStateI = intitialState, action: Action) => {
    //console.log('Action came in! ', action);
    switch (action.type) {

      case MainActions.LOGIN: {
        return Object.assign({}, state, { currentCreds: action.payload, loading: true })
      }
      case MainActions.LOGIN_SUCCESS: {
        return Object.assign({}, state, { currentUser: action.payload, currentCreds: null, error: null, loading: false })
      }
      case MainActions.LOGIN_FAILED: {
        return Object.assign({}, state, <AppStateI>{ error: action.payload, currentUser: null, authChecked: true, loading: false })
      }
      case MainActions.LOGOUT: {
        return Object.assign({}, state,{ loading: true })
      }
      case MainActions.LOGOUT_SUCCESS: {
        return Object.assign({}, intitialState, { authChecked: true })
      }
      case MainActions.LOGOUT_FAILED: {
        return Object.assign({}, state,{ error: action.payload, loading: false })
      }

      case MainActions.CHECK_AUTH: {
        return Object.assign({}, state, { loading: true })
      }
      case MainActions.CHECK_AUTH_SUCCESS: {
        return Object.assign({}, state, <AppStateI>{ currentUser: action.payload, authChecked: true, loading: false })
      }
      case MainActions.CHECK_AUTH_FAILED: {
        return Object.assign({}, state, <AppStateI>{ error: action.payload, currentUser: null, authChecked: true, loading: false })
      }
      case MainActions.CHECK_AUTH_NO_USER: {
        return Object.assign({}, state, <AppStateI>{ currentUser: null, authChecked: true, loading: false })
      }

      //
      case MainActions.CREATE_USER: {
        return Object.assign({}, state, { currentCreds: action.payload, loading: true })
      }
      case MainActions.CREATE_USER_SUCCESS: {
        return Object.assign({}, state, <AppStateI>{ currentUser: action.payload, authChecked: true, loading: false })
      }
      case MainActions.CREATE_USER_FAILED: {
        return Object.assign({}, state,{ error: action.payload, currentUser: null, authChecked: true, loading: false })
      }

      //
      case MainActions.GET_FIREBASE_ARRAY: {
        return Object.assign({}, state, { queryParams: action.payload, loading: true })
      }
      case MainActions.GET_FIREBASE_ARRAY_SUCCESS: {
        return Object.assign({}, state, { dataArray: action.payload, loading: false })
      }
      case MainActions.GET_FIREBASE_ARRAY_FAILED: {
        return Object.assign({}, state, { error: action.payload, loading: false })
      }

      case MainActions.GET_FIREBASE_OBJECT: {
        return Object.assign({}, state, { queryParams: action.payload, loading: true })
      }
      case MainActions.GET_FIREBASE_OBJECT_SUCCESS: {
        return Object.assign({}, state, { dataObject: action.payload, loading: false })
      }
      case MainActions.GET_FIREBASE_OBJECT_FAILED: {
        return Object.assign({}, state, { error: action.payload, loading: false })
      }

      default: {
        return <AppStateI>state;
      }
    }
  };
