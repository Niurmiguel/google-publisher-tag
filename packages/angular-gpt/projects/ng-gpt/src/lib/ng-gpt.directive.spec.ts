import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGptDirective } from './ng-gpt.directive';

describe('NgGptDirective', () => {
  let directive: NgGptDirective;
  let fixture: ComponentFixture<NgGptDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgGptDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(NgGptDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
