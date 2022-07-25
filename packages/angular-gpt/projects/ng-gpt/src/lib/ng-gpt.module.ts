import { ModuleWithProviders, NgModule } from '@angular/core';

import { GPT_OPTIONS, NgGptServiceOptions } from './ng-gpt-options.service';
import { IdGeneratorUtil, ScriptInjectorUtil } from './utils';
import { NgGptDirective } from './ng-gpt.directive';

@NgModule({
  declarations: [NgGptDirective],
  providers: [ScriptInjectorUtil, IdGeneratorUtil],
  exports: [NgGptDirective],
})
export class NgGptModule {
  static forRoot(
    options?: NgGptServiceOptions
  ): ModuleWithProviders<NgGptModule> {
    return {
      ngModule: NgGptModule,
      providers: [
        {
          provide: GPT_OPTIONS,
          useValue: options || {},
        },
      ],
    };
  }
}
