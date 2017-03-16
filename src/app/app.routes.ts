/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   16-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';

export class Routes {

  static HOME:string = "home";
  static ITEM:string = "item";

  static pages = {
    [Routes.HOME]: HomePage,
    [Routes.ITEM]: ItemPage,
  };

  static getPage(id){
    console.log("getPage " + id);
    const route = Routes.pages[id];
    // console.log ("page " + route);
    return route;
  }

  static getRootPage(authenticated:boolean = false){
    console.log ("getRoutePage " + authenticated );
    let root =  Routes.getPage(Routes.HOME) // (authenticated) ? Routes.getPage(Routes.HOME) : Routes.getPage(Routes.LOGIN);
    return root;
  }

  static getPages(){
    const pages:any[] = []
    for (var key in Routes.pages) {
      pages.push(Routes.pages[key]);
    }
    return pages;
  }

  static getDeepLinkerConfig(){
    const config = {links:[]}
    for (var key in Routes.pages) {
      config.links.push({ component: Routes.pages[key], name: key});
    }
    return config;
  }
}
