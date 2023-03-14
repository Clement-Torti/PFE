import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainWindowsComponent } from './main-windows.component';
import { Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('MainWindowsComponent', () => {
  let component: MainWindowsComponent;
  let fixture: ComponentFixture<MainWindowsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let folderServiceSpy: jasmine.SpyObj<FolderService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    folderServiceSpy = jasmine.createSpyObj('FolderService', ['getFolder']);

    await TestBed.configureTestingModule({
      declarations: [MainWindowsComponent, SidebarComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: FolderService, useValue: folderServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
