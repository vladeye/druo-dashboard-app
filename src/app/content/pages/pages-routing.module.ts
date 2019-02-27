import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from "./snippets/error-page/error-page.component";
import { ProfileComponent } from "./header/profile/profile.component";
import { ActionComponent } from "./header/action/action.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'invoices',
        pathMatch: 'full'
      },
      {
        path: 'invoices',
        loadChildren: './components/invoices/invoices.module#InvoicesModule'
      }
    ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }

