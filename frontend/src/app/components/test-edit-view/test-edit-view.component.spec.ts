import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEditViewComponent } from './test-edit-view.component';

describe('TestEditViewComponent', () => {
  let component: TestEditViewComponent;
  let fixture: ComponentFixture<TestEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
