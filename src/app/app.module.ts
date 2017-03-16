/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 16-03-2017
*/

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Import App Components & Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Import ngRx Store
import { mainAppStoreReducer } from '../store/reducers/mainReducer';
import { MainActions } from '../store/actions/mainActions';
import effects from '../store/effects';

// Import Providers Services
import { AuthService } from "../providers/auth-service";
import { DatasService } from "../providers/datas-service";

// Import the AF2 Module + Firebase AFB_API_KEY config
import { AngularFireModule } from 'angularfire2';
import { AFB_API_KEY } from "./apikey-config";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    AngularFireModule.initializeApp(AFB_API_KEY /*, FIREBASE_AUTH_CONFIG*/),
    EffectsModule.runAfterBootstrap(effects),
    StoreModule.provideStore(mainAppStoreReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainActions,
    AuthService,
    DatasService
  ]
})
export class AppModule {}
