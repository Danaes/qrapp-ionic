export class ScanData{

    info:string;
    tipo:string;

    constructor( text:string ) {

        this.tipo = "no definido";
        this.info = text;

        if( text.startsWith("http") ) this.tipo = "http";
    
    }

}