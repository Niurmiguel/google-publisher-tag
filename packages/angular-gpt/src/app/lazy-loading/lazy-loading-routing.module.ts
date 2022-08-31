import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgGptModule } from 'projects/ng-gpt/src/public-api';

import { LazyLoadingComponent } from './lazy-loading.component';

const routes: Routes = [
  {
    path: '',
    component: LazyLoadingComponent,
  },
];

@NgModule({
  declarations: [LazyLoadingComponent],
  imports: [
    CommonModule,
    NgGptModule.forRoot({
      enableLazyLoad: {
        fetchMarginPercent: 500,
        // Render slots within 2 viewports.
        renderMarginPercent: 200,
        // Double the above values on mobile, where viewports are smaller
        // and users tend to scroll faster.
        mobileScaling: 2.0,
      },
    }),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, LazyLoadingComponent],
})
export class LazyLoadingRoutingModule {}
