import { ScanData } from './../../models/scan-data.model';
import { HistorialProvider } from './../../providers/historial/historial';
import { Component } from '@angular/core';


@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial: ScanData[] = [];

  constructor(private historialProvider: HistorialProvider) {
  }

  ionViewDidLoad() {
    this.historial = this.historialProvider.load_record();
  }

  openScan(index:number){
    this.historialProvider.openScan(index);
  }

}
