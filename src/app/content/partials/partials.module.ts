import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuickSidebarComponent } from './layout/quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './layout/scroll-top/scroll-top.component';
import { TooltipsComponent } from './layout/tooltips/tooltips.component';
import { ListSettingsComponent } from './layout/quick-sidebar/list-settings/list-settings.component';
import { NoticeComponent } from "./content/general/notice/notice.component";

// Modules
import { MessengerModule } from './layout/quick-sidebar/messenger/messenger.module';
import { ListTimelineModule } from './layout/quick-sidebar/list-timeline/list-timeline.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MatInputModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule} from '@angular/material';
import { CoreModule } from "../../core/core.module";
import { SpinnerButtonModule } from "./content/general/spinner-button/spinner-button.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    PerfectScrollbarModule,
    MessengerModule,
    ListTimelineModule,
    CoreModule,
    SpinnerButtonModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    QuickSidebarComponent,
    ScrollTopComponent,
    TooltipsComponent,
    NoticeComponent,
    ListSettingsComponent
  ],
  exports: [
    QuickSidebarComponent,
    ScrollTopComponent,
    TooltipsComponent,
    ListSettingsComponent,

    SpinnerButtonModule
  ],

})
export class PartialsModule { }
