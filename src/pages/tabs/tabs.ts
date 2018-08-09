import { GuardadosPage } from './../guardados/guardados';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any = HomePage;
  tab2:any = GuardadosPage;

  constructor() { }

}
