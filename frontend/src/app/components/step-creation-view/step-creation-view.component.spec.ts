import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCreationViewComponent } from './step-creation-view.component';

describe('StepCreationViewComponent', () => {
  let component: StepCreationViewComponent;
  let fixture: ComponentFixture<StepCreationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCreationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepCreationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
