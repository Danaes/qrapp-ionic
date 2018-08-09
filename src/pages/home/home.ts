import { HistorialProvider } from './../../providers/historial/historial';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private toastCtrl: ToastController,
              private platform: Platform,
              private barcodeScanner: BarcodeScanner,
              private historialProvider: HistorialProvider) {
  }

  scan(){
    console.log("Realizando scan");
  
    if(!this.platform.is('cordova')){
      this.historialProvider.add_record("http://google.es");
      return;
    }

    this.barcodeScanner.scan()
    .then( barcodeData => {

      console.log( 'Datos del scan', barcodeData.text );

      if( barcodeData.cancelled && barcodeData.text != null )
        this.historialProvider.add_record( barcodeData.text );

    })
    .catch(err => this.showError("Error: " + err ) );

  }

  showError( msg: string){

    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2500
    });

    toast.present();

  }

}
