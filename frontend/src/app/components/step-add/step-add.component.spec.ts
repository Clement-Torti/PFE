import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAddComponent } from './step-add.component';

describe('StepAddComponent', () => {
  let component: StepAddComponent;
  let fixture: ComponentFixture<StepAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
