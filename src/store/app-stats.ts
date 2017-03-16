/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

export interface AppStateI {
  authChecked: boolean,
  currentUser: any,
  loading: boolean
  error?: any
  dataArray?: Array<any>
  dataObject?: Object
  currentCreds?: any
};
