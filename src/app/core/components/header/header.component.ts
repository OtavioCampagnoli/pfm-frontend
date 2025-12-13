import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() {

  }

  ngOnInit() {
      this.items = [
          {
              label: 'Início',
              icon: 'pi pi-fw pi-home',
              routerLink: 'home'
          },
          {
            label: 'Finanças',
            icon: 'pi pi-fw pi-wallet',
            routerLink: 'transaction-form'
          },

      ];
  }

}
