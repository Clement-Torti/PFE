import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNavBarComponent } from './test-nav-bar.component';

describe('TestNavBarComponent', () => {
  let component: TestNavBarComponent;
  let fixture: ComponentFixture<TestNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
