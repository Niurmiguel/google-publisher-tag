import { Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgGptServiceOptions {
  /**
   * Enables and disables horizontal centering of ads. Centering is disabled by default. In legacy gpt_mobile.js, centering is enabled by default.
   */
  public centering?: boolean;
  /**
   * Enables collapsing of slot divs so that they don't take up any space on the page when there is no ad content to display.
   */
  public collapseEmptyDivs?: boolean;
  /**
   * Sets custom targeting parameters for a given key that apply to all Publisher Ads service ad slots.
   */
  public targeting?: Record<string, string | string[]>;
  /**
   * Sets the value for the publisher-provided ID. See the article on {@link https://support.google.com/admanager/answer/2880055 PPID} for more details.
   */
  public ppid?: string;
  /**
   * Enables lazy loading in GPT as defined by the config object.
   */
  public enableLazyLoad?: {
    fetchMarginPercent: number;
    mobileScaling: number;
    renderMarginPercent: number;
  };
  /**
   * Passes location information from websites so you can geo-target line items to specific locations.
   */
  public address?: string;
  /**
   * Configures whether all ads on the page should be forced to be rendered using a SafeFrame container.
   */
  public forceSafeFrame?: boolean;
  /**
   * Sets the page-level preferences for SafeFrame configuration.
   *
   * These page-level preferences will be overridden by slot-level preferences, if specified.
   */
  public safeFrameConfig?: googletag.SafeFrameConfig;

  /**
   * Configuration object for privacy settings.
   */
  public privacySettingsConfig?: googletag.PrivacySettingsConfig;
}

export const GPT_OPTIONS = new InjectionToken<NgGptServiceOptions>(
  'NgGptServiceOptions'
);
