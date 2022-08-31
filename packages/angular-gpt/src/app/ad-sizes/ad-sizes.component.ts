import { Component } from '@angular/core';

@Component({
  selector: 'app-ad-sizes',
  templateUrl: './ad-sizes.component.html',
})
export class AdSizesComponent {
  size: googletag.SingleSize = [300, 250];
  multiSize: googletag.MultiSize = [
    [300, 250],
    [728, 90],
    [750, 200],
  ];
  sizeMapping: googletag.SizeMapping[] = [
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
  ];
}
