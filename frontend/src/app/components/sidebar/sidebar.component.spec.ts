import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FolderService } from 'src/app/services/folder.service';
import { MOCKED_FOLDER } from 'src/app/mocks/folder-mock';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const folderServiceSpy: jasmine.SpyObj<FolderService> = jasmine.createSpyObj(
    'FolderService',
    ['getFolder']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [{ provide: FolderService, useValue: folderServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
