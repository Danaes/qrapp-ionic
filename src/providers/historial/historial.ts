import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { ScanData } from './../../models/scan-data.model';



@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];

  constructor( private iab: InAppBrowser) { }

  load_record(){ return this._historial; }

  add_record( text:string){
    let data = new ScanData( text );

    this._historial.unshift(data);

    this.openScan( 0 );
  }

  openScan( index: number ){

    let scanData = this._historial[index];

    switch( scanData.tipo ){
      case "http": 
        this.iab.create( scanData.info, "_system" );
        break;

      default: console.error("Tipo no soportado");
    }

  }

}
