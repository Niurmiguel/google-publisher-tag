import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGptComponent } from './ng-gpt.component';

describe('NgGptComponent', () => {
  let component: NgGptComponent;
  let fixture: ComponentFixture<NgGptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgGptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgGptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
