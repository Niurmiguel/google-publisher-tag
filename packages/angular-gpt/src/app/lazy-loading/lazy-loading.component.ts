import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
})
export class LazyLoadingComponent extends BaseComponent implements OnDestroy {
  status: Record<string, { fetched: boolean; rendered: boolean }> = {};

  constructor(private change: ChangeDetectorRef) {
    super();
  }

  slotOnload(event: any) {
    const slotId = event.slot.getSlotElementId();

    this.status[slotId] = this.status[slotId] || {};
    this.status[slotId].rendered = true;
    this.change.markForCheck();
  }

  slotRequested(event: any) {
    const slotId = event.slot.getSlotElementId();

    this.status[slotId] = this.status[slotId] || {};
    this.status[slotId].fetched = true;
    this.change.markForCheck();
  }
}
