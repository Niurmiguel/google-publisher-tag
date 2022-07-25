class NgGptEvent {
  serviceName!: string;
  slot!: googletag.Slot;
  constructor(event: googletag.events.Event) {
    Object.assign(this, event);
  }
}

export class ImpressionViewableEvent extends NgGptEvent {}
export class RewardedSlotClosedEvent extends NgGptEvent {}
export class RewardedSlotGrantedEvent extends NgGptEvent {
  payload!: null | googletag.RewardedPayload;
}
export class SlotOnloadEvent extends NgGptEvent {}
export class SlotRenderEndedEvent extends NgGptEvent {
  advertiserId?: null | number;
  campaignId?: null | number;
  creativeId?: null | number;
  isEmpty!: boolean;
  lineItemId?: null | number;
  size!: googletag.SingleSize;
  sourceAgnosticCreativeId?: null | number;
  sourceAgnosticLineItemId?: null | number;
}
export class SlotRequestedEvent extends NgGptEvent {}
export class SlotResponseReceived extends NgGptEvent {}
export class SlotVisibilityChangedEvent extends NgGptEvent {
  inViewPercentage!: number;
}

export type Event =
  | ImpressionViewableEvent
  | RewardedSlotClosedEvent
  | RewardedSlotGrantedEvent
  | SlotOnloadEvent
  | SlotRenderEndedEvent
  | SlotRequestedEvent
  | SlotResponseReceived
  | SlotVisibilityChangedEvent;
