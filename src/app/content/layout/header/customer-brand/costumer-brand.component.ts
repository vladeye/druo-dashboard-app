import {Component, OnInit, HostBinding, Input, Inject, ChangeDetectionStrategy} from '@angular/core';
import { ClassInitService } from '../../../../core/services/class-init.service';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
import {DOCUMENT} from '@angular/common';
import {MenuConfigService} from "../../../../core/services/menu-config.service";
import {MenuHorizontalService} from "../../../../core/services/layout/menu-horizontal.service";

@Component({
	selector: 'm-costumer-brand',
	templateUrl: 'costumer-brand.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostumerBrandComponent implements OnInit {
	@HostBinding('class') classes = 'm-stack__item';
	@Input() menuHeaderDisplay: any = true;
	@Input() costumerNameText: any = '';
  @Input() menuHeaderSkin: any = '';


	constructor(
		private classInitService: ClassInitService,
		private layoutConfigService: LayoutConfigService,
		@Inject(DOCUMENT) private document: Document
	) {
		// subscribe to class update event
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			this.classes = 'm-stack__item ' + classes.brand.join(' ');
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
      this.menuHeaderSkin = objectPath.get(
        model,
        'config.menu.header.desktop.skin'
      );

			const costumerNameText = objectPath.get(model, 'config.header.self.costumerNameText');
			if (typeof costumerNameText === 'object') {
				this.costumerNameText = objectPath.get(
          costumerNameText,
					'name'
				);
			} else {
				this.costumerNameText = costumerNameText;
			}
		});
	}

	ngOnInit(): void {}

}
