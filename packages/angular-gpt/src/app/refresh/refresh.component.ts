import { Component } from '@angular/core';
import { NgGptService } from 'projects/ng-gpt/src/public-api';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
})
export class RefreshComponent {
  constructor(private gpt: NgGptService) {}

  doRefresh(slotId?: string): void {
    if (slotId) {
      const slot = this.gpt.getSlot(slotId);
      if (slot) this.gpt.refresh(slot);
    } else {
      googletag.pubads().refresh();
    }
  }

  doClear(): void {
    googletag.pubads().clear();
  }
}
