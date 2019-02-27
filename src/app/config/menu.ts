// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
  public config: any = {};


  constructor() {
    this.config = {
      // Left Empty for future use.
      header: {
        self: {},
        items: []
      },
      aside: {
        self: {},
        items: [
          {
            title: 'Inicio',
            desc: 'Dashboard Page',
            root: true,
            icon: 'flaticon-line-graph',
            page: '/home',
            translate: 'MENU.DASHBOARD'
          },
          {
            title: 'Reportes',
            desc: 'Reports Page',
            root: true,
            icon: 'flaticon-diagram',
            page: '/home/reports',
            translate: 'MENU.REPORTS'
          },
          {
            title: 'Transacciones',
            desc: 'Transaction Page',
            root: true,
            icon: 'flaticon-list',
            page: '/home/transactions',
            translate: 'MENU.TRANSACTIONS'
          },
          {
            title: 'Clientes',
            desc: 'Clients Page',
            root: true,
            icon: 'flaticon-users',
            page: '/home/clients',
            translate: 'MENU.CLIENTS'
          },
          {
            title: 'Facturas',
            desc: 'Invoices Page',
            root: true,
            icon: 'flaticon-graphic-1',
            page: '/home/invoices',
            translate: 'MENU.INVOICES'
          },
          {
            title: 'Configuración',
            desc: 'Configuration Page',
            root: true,
            icon: 'flaticon-settings',
            page: '/home/settings',
            translate: 'MENU.CONFIGURATIONS'
          },
          {
            title: 'Soporte',
            desc: 'Support Page',
            root: true,
            icon: 'flaticon-questions-circular-button',
            page: '/home/support',
            translate: 'MENU.SUPPORT'
          }
        ]
      }
    };
  }
}
