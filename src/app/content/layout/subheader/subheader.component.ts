import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubheaderService } from '../../../core/services/layout/subheader.service';

@Component({
	selector: 'm-subheader',
	templateUrl: './subheader.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubheaderComponent implements OnInit {
	constructor(public subheaderService: SubheaderService) {
	  console.log('test subheaderService');
  }

	ngOnInit(): void {}
}
