import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ActionComponent } from "./header/action/action.component";
import { ProfileComponent } from "./header/profile/profile.component";
import { PartialsModule } from "../partials/partials.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "../../core/core.module";
import { LayoutModule } from "../layout/layout.module";
import { ErrorPageComponent } from "./snippets/error-page/error-page.component";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialCommonModule } from "../../shared/material/material-common.module";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PagesRoutingModule,
    CoreModule,
    LayoutModule,
    PartialsModule,
    AngularEditorModule,
    MaterialCommonModule
  ],
  declarations: [
    PagesComponent,
    ActionComponent,
    ProfileComponent,
    ErrorPageComponent
  ]
})
export class PagesModule { }
