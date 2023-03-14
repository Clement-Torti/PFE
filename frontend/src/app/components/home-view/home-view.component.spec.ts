import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeViewComponent } from './home-view.component';
import { TaskService } from 'src/app/services/task.service';
import { FolderService } from 'src/app/services/folder.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let folderServiceSpy: jasmine.SpyObj<FolderService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getFolders']);
    folderServiceSpy = jasmine.createSpyObj('FolderService', [
      'importFolder',
      'setFolder',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeViewComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: FolderService, useValue: folderServiceSpy },
        { provide: Router, useValue: routerSpy },
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
    const folders = [
      { _id: '123', title: 'test' },
      { _id: '456', title: 'test2' },
    ];
    taskServiceSpy.getFolders.and.returnValue(of(folders));
    component.ngOnInit();
    expect(component.folders).toEqual(folders);
  });

  it('should call importFolder on selectDirectory', () => {
    const files = [{ name: 'test' }];
    component.selectDirectory(files);
    expect(folderServiceSpy.importFolder).toHaveBeenCalledWith(files);
  });

  it('should call setFolder and navigate on onFolderSelected', () => {
    const folder = { _id: '123', title: 'test' };
    component.onFolderSelected(folder);
    expect(folderServiceSpy.setFolder).toHaveBeenCalledWith(folder._id);
  });
});
