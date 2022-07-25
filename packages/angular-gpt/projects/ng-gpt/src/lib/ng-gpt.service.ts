import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { buffer, switchMap } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

import { Request, RefreshSlot, DisplaySlot } from './ng-gpt.actions';
import { DELAY_TIME, GPT_URL } from './constants';

import {
  ImpressionViewableEvent,
  RewardedSlotClosedEvent,
  RewardedSlotGrantedEvent,
  SlotOnloadEvent,
  SlotRenderEndedEvent,
  SlotRequestedEvent,
  SlotResponseReceived,
  SlotVisibilityChangedEvent,
} from './ng-gpt.events';
import { GPT_OPTIONS, NgGptServiceOptions } from './ng-gpt-options.service';
import { ScriptInjectorUtil } from './utils';

@Injectable({
  providedIn: 'root',
})
export class NgGptService {
  private $singleRequest = new Subject<Request>();

  constructor(
    @Inject(GPT_OPTIONS) private options: NgGptServiceOptions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private scriptInjector: ScriptInjectorUtil
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  init(): void {
    if (!window.googletag) {
      const loadScript = () => {
        this.scriptInjector.injectScript(GPT_URL);
      };
      loadScript();
      (window as any).googletag = window.googletag || { cmd: [] };
    }

    this.$singleRequest
      .pipe(
        buffer(this.$singleRequest.pipe(switchMap(() => timer(DELAY_TIME * 2))))
      )
      .subscribe((acts) => {
        const refreshSlots: googletag.Slot[] = [];
        acts.forEach((act) => {
          if (act instanceof DisplaySlot) {
            googletag.display(act.slot);
          } else {
            refreshSlots.push(act.slot);
          }
        });
        if (refreshSlots.length > 0) {
          googletag.pubads().refresh(refreshSlots);
        }
      });

    googletag.cmd.push(() => {
      const pubads = googletag.pubads();
      const {
        address,
        centering,
        collapseEmptyDivs,
        enableLazyLoad,
        ppid,
        targeting,
        forceSafeFrame,
        safeFrameConfig,
        privacySettingsConfig,
      } = this.options;

      // Collapse Empty Divs
      if (collapseEmptyDivs) pubads.collapseEmptyDivs();
      // Centering
      if (centering) pubads.setCentering(centering);
      // Location
      if (address) pubads.setLocation(address);
      // Publisher Provided Id
      if (ppid) pubads.setPublisherProvidedId(ppid);
      // Force Safe Frame
      if (forceSafeFrame) pubads.setForceSafeFrame(forceSafeFrame);
      // Targeting
      if (targeting && Object.keys(targeting).length) {
        for (const key in targeting) {
          if (targeting.hasOwnProperty(key)) {
            pubads.setTargeting(key, targeting[key]);
          }
        }
      }
      // Safe Frame Config
      if (safeFrameConfig && Object.keys(safeFrameConfig).length) {
        pubads.setSafeFrameConfig(safeFrameConfig);
      }
      // Privacy Settings Config
      if (privacySettingsConfig && Object.keys(privacySettingsConfig).length) {
        googletag.pubads().setPrivacySettings(privacySettingsConfig);
      }

      // Enable Lazy Load
      if (enableLazyLoad && Object.keys(enableLazyLoad).length) {
        pubads.enableLazyLoad(enableLazyLoad);
      }
    });
  }

  define(ad: any, slot?: googletag.Slot): googletag.Slot {
    const id = ad.id || '';
    const pubads = googletag.pubads();

    if (!slot) {
      const exists = this.getSlot(id);
      if (exists) {
        this.destroy(exists);
      }
      if (ad.size) {
        slot = googletag.defineSlot(
          ad.adUnitPath,
          ad.size,
          id
        ) as googletag.Slot;
      } else {
        slot = googletag.defineOutOfPageSlot(
          ad.adUnitPath,
          id
        ) as googletag.Slot;
      }
    }

    if (ad.sizeMapping) {
      slot.defineSizeMapping(ad.sizeMapping);
    }

    slot.clearCategoryExclusions();

    if (ad.categoryExclusion) {
      if (ad.categoryExclusion instanceof Array) {
        const s = slot;
        ad.categoryExclusion.forEach((cat: string) =>
          s.setCategoryExclusion(cat)
        );
      } else {
        slot.setCategoryExclusion(ad.categoryExclusion);
      }
    }

    if (typeof ad.forceSafeFrame === 'boolean') {
      slot.setForceSafeFrame(ad.forceSafeFrame);
    }

    if (ad.safeFrameConfig) {
      slot.setSafeFrameConfig(ad.safeFrameConfig);
    }

    slot.clearTargeting();
    if (ad.targeting) {
      slot.updateTargetingFromMap(ad.targeting);
    }

    if (ad.collapseEmptyDiv instanceof Array) {
      slot.setCollapseEmptyDiv(ad.collapseEmptyDiv[0], ad.collapseEmptyDiv[1]);
    } else if (typeof ad.collapseEmptyDiv === 'boolean') {
      slot.setCollapseEmptyDiv(ad.collapseEmptyDiv);
    }

    if (ad.clickUrl) {
      slot.setClickUrl(ad.clickUrl);
    }

    // Events
    googletag.cmd.push(() => {
      pubads.addEventListener('impressionViewable', (event) => {
        ad.impressionViewable.emit(new ImpressionViewableEvent(event));
      });
      pubads.addEventListener('rewardedSlotClosed', (event) => {
        ad.rewardedSlotClosed.emit(new RewardedSlotClosedEvent(event));
      });
      pubads.addEventListener('rewardedSlotGranted', (event) => {
        ad.rewardedSlotGranted.emit(new RewardedSlotGrantedEvent(event));
      });
      pubads.addEventListener('rewardedSlotReady', (event) => {
        ad.rewardedSlotReady.emit(new RewardedSlotGrantedEvent(event));
      });
      pubads.addEventListener('slotOnload', (event) => {
        ad.slotOnload.emit(new SlotOnloadEvent(event));
      });
      pubads.addEventListener('slotRenderEnded', (event) => {
        ad.slotRenderEnded.emit(new SlotRenderEndedEvent(event));
      });
      pubads.addEventListener('slotRequested', (event) => {
        ad.slotRequested.emit(new SlotRequestedEvent(event));
      });
      pubads.addEventListener('slotResponseReceived', (event) => {
        ad.slotResponseReceived.emit(new SlotResponseReceived(event));
      });
      pubads.addEventListener('slotVisibilityChanged', (event) => {
        ad.slotVisibilityChanged.emit(new SlotVisibilityChangedEvent(event));
      });
    });

    slot.addService(googletag.pubads());

    googletag.enableServices();

    return slot;
  }

  display(slot: googletag.Slot): void {
    this.$singleRequest.next(new DisplaySlot(slot));
  }

  refresh(slot: googletag.Slot): void {
    this.$singleRequest.next(new RefreshSlot(slot));
  }

  destroy(slot: googletag.Slot): void {
    googletag.destroySlots([slot]);
  }

  getSlot(id: string): googletag.Slot | undefined {
    return this.getSlots().find((slot) => slot.getSlotElementId() === id);
  }

  getSlots(ids?: string[]): googletag.Slot[] {
    const slots: googletag.Slot[] = googletag.pubads().getSlots();

    return slots.filter(
      (slot) => !ids || ids.includes(slot.getSlotElementId())
    );
  }

  defineTask(task: () => void): boolean {
    if (isPlatformBrowser(this.platformId)) {
      googletag.cmd.push(task);
      return true;
    }
    return false;
  }
}
