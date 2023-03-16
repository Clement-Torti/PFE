import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainWindowsComponent } from './main-windows.component';
import { Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MOCKED_FOLDER } from 'src/app/mocks/folder-mock';

describe('MainWindowsComponent', () => {
  let component: MainWindowsComponent;
  let fixture: ComponentFixture<MainWindowsComponent>;
  const routerServiceSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );
  const folderServiceSpy: jasmine.SpyObj<FolderService> = jasmine.createSpyObj(
    'FolderService',
    ['getFolder']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainWindowsComponent, SidebarComponent],
      providers: [
        { provide: Router, useValue: routerServiceSpy },
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
