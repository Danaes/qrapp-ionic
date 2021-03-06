import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lat: number;
  lng: number;

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
    
    let coords = this.navParams.get("coords").split(",");

    this.lat = Number ( coords[0].replace("geo:","") );
    this.lng = Number ( coords[1] );
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
  

}
