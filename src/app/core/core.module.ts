import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickSidebarOffcanvasDirective } from './directives/quick-sidebar-offcanvas.directive';
import { QuickSearchDirective } from './directives/quick-search.directive';

import { GetObjectPipe } from './pipes/get-object.pipe';
import { MenuAsideOffcanvasDirective } from "./directives/menu-aside-offcanvas.directive";
import { MenuAsideDirective } from "./directives/menu-aside.directive";
import { MenuHorizontalDirective } from "./directives/menu-horizontal.directive";
import { MenuHorizontalOffcanvasDirective } from "./directives/menu-horizontal-offcanvas.directive";
import { TimeElapsedPipe } from "./pipes/time-elapsed.pipe";
import { JoinPipe } from "./pipes/join.pipe";
import { FirstLetterPipe } from "./pipes/first-letter.pipe";
import { MenuAsideToggleDirective } from "./directives/menu-aside-toggle.directive";
import { SafePipe } from "./pipes/safe.pipe";
import { ClipboardDirective } from "./directives/clipboard.directive";


@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
    MenuAsideDirective,
    MenuAsideOffcanvasDirective,
    MenuAsideToggleDirective,
    MenuHorizontalDirective,
    MenuHorizontalOffcanvasDirective,
		QuickSidebarOffcanvasDirective,
		QuickSearchDirective,
    ClipboardDirective,
		// pipes
    FirstLetterPipe,
    GetObjectPipe,
    TimeElapsedPipe,
    JoinPipe,
    SafePipe
	],
	exports: [
		// directives
    MenuAsideDirective,
    MenuAsideOffcanvasDirective,
    MenuAsideToggleDirective,
    MenuHorizontalDirective,
    MenuHorizontalOffcanvasDirective,
		QuickSidebarOffcanvasDirective,
		QuickSearchDirective,
    ClipboardDirective,
		// pipes
    FirstLetterPipe,
    GetObjectPipe,
    TimeElapsedPipe,
    JoinPipe,
    SafePipe
	],
	providers: []
})
export class CoreModule {}
