import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeViewComponent } from './home-view.component';
import { TaskService } from 'src/app/services/task.service';
import { FolderService } from 'src/app/services/folder.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MOCKED_FOLDERS } from 'src/app/mocks/folder-mock';
import { MOCKED_FILES } from 'src/app/mocks/file-mock';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;
  const taskServiceSpy: jasmine.SpyObj<TaskService> = jasmine.createSpyObj(
    'TaskService',
    ['getFolders']
  );
  const folderServiceSpy: jasmine.SpyObj<FolderService> = jasmine.createSpyObj(
    'FolderService',
    ['importFolder', 'setFolder']
  );
  const routerServiceSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );

  taskServiceSpy.getFolders.and.returnValue(of(MOCKED_FOLDERS));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeViewComponent],
      providers: [
        {
          provide: TaskService,
          useValue: taskServiceSpy,
        },
        {
          provide: FolderService,
          useValue: folderServiceSpy,
        },
        {
          provide: Router,
          useValue: routerServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load folders on init', () => {
    component.ngOnInit();
    expect(component.folders).toEqual(MOCKED_FOLDERS);
  });

  it('should call importFolder on selectDirectory', () => {
    component.selectDirectory(MOCKED_FILES);
    expect(folderServiceSpy.importFolder).toHaveBeenCalledWith(MOCKED_FILES);
  });

  it('should call setFolder and navigate on onFolderSelected', () => {
    const folder = { _id: '123', title: 'test' };
    component.onFolderSelected(folder);
    expect(folderServiceSpy.setFolder).toHaveBeenCalledWith(folder._id);
    expect(routerServiceSpy.navigate).toHaveBeenCalled();
  });
});
