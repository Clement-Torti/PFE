import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNavBarComponent } from './step-nav-bar.component';

describe('StepNavBarComponent', () => {
  let component: StepNavBarComponent;
  let fixture: ComponentFixture<StepNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
