import { Contacts } from '@ionic-native/contacts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MapaPage } from './../pages/mapa/mapa';
import { GuardadosPage } from './../pages/guardados/guardados';
import { TabsPage } from './../pages/tabs/tabs';
import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HistorialProvider } from '../providers/historial/historial';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaVTENC9fM36SAVvTWoPph7y8ZQzyHDXM'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    GuardadosPage,
    MapaPage
  ],
  schemas:  [ 
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider
  ]
})
export class AppModule {}
