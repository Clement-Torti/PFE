import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunViewComponent } from './test-run-view.component';

describe('TestRunViewComponent', () => {
  let component: TestRunViewComponent;
  let fixture: ComponentFixture<TestRunViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRunViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRunViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
