import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FolderService } from 'src/app/services/folder.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let folderServiceSpy: jasmine.SpyObj<FolderService>;

  beforeEach(async () => {
    folderServiceSpy = jasmine.createSpyObj('FolderService', ['getFolder']);

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
