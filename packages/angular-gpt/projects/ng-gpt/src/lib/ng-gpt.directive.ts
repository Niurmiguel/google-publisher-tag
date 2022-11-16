import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Subscription, timer } from 'rxjs';
import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
} from '@angular/core';

import { NgGptService } from './ng-gpt.service';
import { IdGeneratorUtil } from './utils';
import { DELAY_TIME } from './constants';

@Directive({
  selector: 'gpt-ad',
})
export class NgGptDirective
  implements OnInit, DoCheck, OnDestroy, AfterViewInit
{
  private $update = new Subject<void>();
  private $destroy = new Subject<void>();
  private slot?: googletag.Slot;

  private onSameNavigation: Subscription;

  @Input() adUnitPath: string = '';
  @Input() id?: string = '';
  @Input() size?: googletag.GeneralSize;
  @Input() sizeMapping?: googletag.SizeMappingArray;
  @Input() categoryExclusion?: string | string[];
  @Input() collapseEmptyDiv?: boolean | [boolean, boolean];
  @Input() forceSafeFrame?: boolean;
  @Input() safeFrameConfig?: googletag.SafeFrameConfig;
  @Input() targeting?: Record<string, string | string[]>;
  @Input() clickUrl?: string;
  @Input() refresh?: number;

  // Events
  @Output() impressionViewable: EventEmitter<Event> = new EventEmitter();
  @Output() rewardedSlotClosed: EventEmitter<Event> = new EventEmitter();
  @Output() rewardedSlotGranted: EventEmitter<Event> = new EventEmitter();
  @Output() rewardedSlotReady: EventEmitter<Event> = new EventEmitter();
  @Output() slotOnload: EventEmitter<Event> = new EventEmitter();
  @Output() slotRenderEnded: EventEmitter<Event> = new EventEmitter();
  @Output() slotRequested: EventEmitter<Event> = new EventEmitter();
  @Output() slotResponseReceived: EventEmitter<Event> = new EventEmitter();
  @Output() slotVisibilityChanged: EventEmitter<Event> = new EventEmitter();

  constructor(
    @Optional() private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
    private gptService: NgGptService,
    private idGenerator: IdGeneratorUtil
  ) {
    if (isPlatformBrowser(platformId)) {
      this.init();
    }
  }
  ngAfterViewInit(): void {
    if (this.elementRef.nativeElement && this.elementRef.nativeElement.id) {
      this.destroy();
      this.create();
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.id) {
      this.idGenerator.generate(this.elementRef.nativeElement);
    }
  }

  ngDoCheck(): void {
    if (
      this.elementRef.nativeElement &&
      this.elementRef.nativeElement.id &&
      this.id !== this.elementRef.nativeElement.id
    ) {
      this.id = this.elementRef.nativeElement.id;
      this.destroy();
      this.create();
    }
  }

  ngOnDestroy() {
    if (this.slot) {
      googletag.destroySlots([this.slot]);
    }
    if (this.onSameNavigation) {
      this.onSameNavigation.unsubscribe();
    }
  }

  display(): void {
    if (this.slot) {
      this.gptService.define(this, this.slot);
      this.gptService.refresh(this.slot);
    } else {
      this.destroy();
      this.slot = this.gptService.define(
        Object.assign({}, this, {
          id: this.id || this.elementRef.nativeElement?.id,
        })
      );
      this.gptService.display(this.slot);
    }
  }

  checkRequiredFields(input: any, name: string): void {
    if (!input) {
      throw new Error(`Attribute ${name} is required`);
    }
  }

  destroy() {
    if (this.slot) {
      this.gptService.destroy(this.slot);
      this.slot = undefined;
    }
  }

  private init(): void {
    this.$update
      .pipe(
        switchMap(() => timer(DELAY_TIME)),
        takeUntil(this.$destroy)
      )
      .subscribe(() => {
        this.checkRequiredFields(this.adUnitPath, 'adUnitPath');
        this.gptService.defineTask(() => this.display());
      });

    if (this.router) {
      this.onSameNavigation = this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(this.$destroy)
        )
        .subscribe(() => {
          this.$update.next();
        });
    }
  }

  create() {
    if (this.adUnitPath) {
      this.$update.next();
    } else {
      this.destroy();
    }
  }
}
