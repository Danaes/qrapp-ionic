import { MapaPage } from './../../pages/mapa/mapa';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { ScanData } from './../../models/scan-data.model';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];

  constructor( private iab: InAppBrowser, 
              private modalCtrl: ModalController,
              private contacts: Contacts, 
              private platform: Platform,
              private toastCtrl: ToastController,
              private emailComposer: EmailComposer) { }

  load_record(){ return this._historial; }

  add_record( text:string){
    let data = new ScanData( text );

    this._historial.unshift(data);

    //console.log(data);

    this.openScan( 0 );
  }

  openScan( index: number ){

    let scanData = this._historial[index];

    switch( scanData.tipo ){
      case "http": 
        this.iab.create( scanData.info, "_system" );
        break;

      case "mapa": 
        this.modalCtrl.create(MapaPage, {
          coords: scanData.info
        }).present();
        break;

      case "contacto":
        this.addContact( scanData.info );
        break;

      case "email":
        this.sendMail( scanData.info );
        break;

      default: console.error("Tipo no soportado");
    }

  }

  private addContact( text:string ){

    let campos: any = this.parse_vcard( text );

    let name = campos.fn;
    let tel = campos.tel[0].value[0];


    if( !this.platform.is('cordova') ){
      console.warn("Estas en el ordenador, no puedo guardar el contacto");
      return;
    }

    //console.warn(name, tel);

    let contact: Contact = this.contacts.create();
    contact.name = new ContactName('', name);
    contact.phoneNumbers = [new ContactField('mobile', tel)];

    contact.save().then( 
      () => this.showToast("Contacto " + name + " añadido"),
      ( err: any ) => console.error("Error: " + err));
  }

  private showToast( msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 2500
    }).present();
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  };

  private sendMail( text: string ){

    text = text.replace("MATMSG:TO:","");
    text = text.replace(";SUB:",",");
    text = text.replace(";BODY:",",");

    let mail = text.split(',');

    //console.log(mail[0],mail[1],mail[2]);

    let email = {
      to: mail[0],
      subject: mail[1],
      body: mail[2],
      isHtml: true
    };
    
    this.emailComposer.open(email);
  }

}
