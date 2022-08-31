<p align="center">
  <a href="https://angular.io/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A <a href="https://angular.io/" target="_blank">Angular</a> implementation of the <a href="https://developers.google.com/doubleclick-gpt/" target="_blank">Google Publisher Tags</a>.</p>

<p align="center">This library was generated with <a href="https://github.com/angular/angular-cli">Angular CLI</a> version 14.1.0.</p>


## Description

The <a href="https://developers.google.com/publisher-tag/guides/get-started" target="_blank">Google Publisher Tag (GPT)</a> is an ad tagging library for Google Ad Manager which is used to dynamically build ad requests. It takes key details from you (such as ad unit code, ad size, and custom targeting), builds the request, and displays the ad on web pages.

#### Installation

```bash
$ npm i --save @niur/ng-gpt @types/googletag
```

#### Overview

Import Angular GPT and pass props to the component.


```typescript
//  app.module.ts

import { NgGptModule } from '@niur/ng-gpt';
...
@NgModule({
    declarations: [AppComponent],
    imports: [
        NgGptModule.forRoot(options)
    ]
})

```

#### Options

<table>
<tr>
    <td><code>centering</code></td>
    <td>Enables and disables horizontal centering of ads. Centering is disabled by default. In legacy gpt_mobile.js, centering is enabled by default.</td>
  </tr>
  <tr>
    <td><code>collapseEmptyDivs</code></td>
    <td>Enables collapsing of slot divs so that they don't take up any space on the page when there is no ad content to display.</td>
  </tr>
  <tr>
    <td><code>targeting</code></td>
    <td>Sets custom targeting parameters for a given key that apply to all Publisher Ads service ad slots.</td>
  </tr>
  <tr>
    <td><code>ppid</code></td>
    <td>Sets the value for the publisher-provided ID. See the article on <a href="https://support.google.com/admanager/answer/2880055" rel="nofollow" target="_blank">PPID</a> for more details.</td>
  </tr>
  <tr>
    <td><code>address</code></td>
    <td>Passes location information from websites so you can geo-target line items to specific locations.</td>
  </tr>
  <tr>
    <td><code>forceSafeFrame</code></td>
    <td>Configures whether all ads on the page should be forced to be rendered using a SafeFrame container.</td>
  </tr>
  <tr>
    <td><code>safeFrameConfig</code></td>
    <td>Sets the page-level preferences for SafeFrame configuration.</td>
  </tr>
  <tr>
    <td><code>enableLazyLoad</code></td>
    <td>Enables lazy loading in GPT as defined by the config object.</td>
  </tr>
  <tr>
    <td><code>disableInitialLoad</code></td>
    <td>Disables requests for ads on page load, but allows ads to be requested with a <b>googletag.pubads().refresh()</b> call. This should be set prior to enabling the service. Async mode must be used; otherwise it will be impossible to request ads using refresh.</td>
  </tr>
  <tr>
    <td><code>privacySettingsConfig</code></td>
    <td>Configuration object for privacy settings.</td>
  </tr>
</table>

### Events

<table>
<tr>
    <td><code>impressionViewable</code></td>
    <td>This event is fired when an impression becomes viewable, according to the <a href="https://support.google.com/admanager/answer/4524488" rel="nofollow" target="_blank">Active View criteria.</a></td>
  </tr>
  <tr>
    <td><code>rewardedSlotClosed</code></td>
    <td>This event is fired when a rewarded ad slot is closed by the user. It may fire either before or after a reward has been granted. </td>
  </tr>
  <tr>
    <td><code>rewardedSlotGranted</code></td>
    <td>This event is fired when a reward is granted for viewing a <a href="https://support.google.com/admanager/answer/9116812" rel="nofollow" target="_blank">rewarded ad</a>. If the ad is closed before the criteria for granting a reward is met, this event will not fire.</td>
  </tr>
  <tr>
    <td><code>rewardedSlotReady</code></td>
    <td>This event is fired when <a href="https://support.google.com/admanager/answer/9116812" rel="nofollow" target="_blank">rewarded ad</a> ad is ready to be displayed. The publisher is responsible for presenting the user an option to view the ad before displaying it.</td>
  </tr>
  <tr>
    <td><code>slotOnload</code></td>
    <td>This event is fired when the creative's iframe fires its load event. When rendering rich media ads in sync rendering mode, no iframe is used so no <b>SlotOnloadEvent</b> will be fired.</td>
  </tr>
  <tr>
    <td><code>slotRenderEnded</code></td>
    <td>This event is fired when the creative code is injected into a slot. This event will occur before the creative's resources are fetched, so the creative may not be visible yet. If you need to know when all creative resources for a slot have finished loading, consider the <a href="https://developers.google.com/publisher-tag/reference?hl=en#googletag.events_SlotOnloadEvent" rel="nofollow" target="_blank">SlotOnloadEvent</a> instead.</td>
  </tr>
  <tr>
    <td><code>slotRequested</code></td>
    <td>This event is fired when an ad has been requested for a particular slot.</td>
  </tr>
  <tr>
    <td><code>slotResponseReceived</code></td>
    <td>This event is fired when an ad response has been received for a particular slot.</td>
  </tr>
  <tr>
    <td><code>slotVisibilityChanged</code></td>
    <td>This event is fired whenever the on-screen percentage of an ad slot's area changes. The event is throttled and will not fire more often than once every 200ms.</td>
  </tr>
</table>

## Example

```html
<!-- Fixed size ad slot -->
<!-- This ad slot will display an ad sized 300x250. -->
<div class="ad-container">
    <gpt-ad adUnitPath="/6355419/Travel/Europe/France/Paris" [size]="[300, 250]"></gpt-ad>
</div>

<!-- Multi-size ad slot -->
<!-- This ad slot will display an ad with any of the following dimensions: 300x250, 728x90, 750x200. -->
<div class="ad-container">
    <gpt-ad adUnitPath="/6355419/Travel/Europe" [size]="[
    [300, 250],
    [728, 90],
    [750, 200],
  ]"></gpt-ad>
</div>


<!-- Fluid ad slot -->
<!-- This ad slot will resize its height to fit the creative content being displayed. For this example, the slot is
    limited to 50% of the width of its parent container. -->
<div class="ad-container">
    <gpt-ad adUnitPath="/6355419/Travel" [size]="['fluid']"></gpt-ad>
</div>

<!-- Responsive ad slot -->
<!-- This ad slot will display different sized ads depending on the size of the browser viewport at page load time: -->

<!-- When viewport= 1024x768, ads sized 750x200 or 728x90 may be displayed. -->
<!-- When 1024x768 viewport= 640x480, ads sized 300x250 may be displayed. -->
<!-- When viewport 640x480, no ads may be displayed. -->
<div class="ad-container">
    <gpt-ad adUnitPath="/6355419/Travel/Europe" [size]="[
    [300, 250],
    [728, 90],
    [750, 200],
  ]" [sizeMapping]="[
    [
      [1024, 768],
      [
        [750, 200],
        [728, 90],
      ],
    ],
    [
      [640, 480],
      [300, 250],
    ],
    [[0, 0], []],
  ]"></gpt-ad>
</div>
```

## Stay in touch

* Author - [Niurmiguel Gonzalez](https://twitter.com/NiurmiguelGonz)

## License

[MIT licensed](LICENSE).