import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWindowsComponent } from './main-windows.component';

describe('MainWindowsComponent', () => {
  let component: MainWindowsComponent;
  let fixture: ComponentFixture<MainWindowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainWindowsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
