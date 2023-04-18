import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainWindowsComponent } from './components/main-windows/main-windows.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestEditViewComponent } from './components/test-edit-view/test-edit-view.component';
import { TestRunViewComponent } from './components/test-run-view/test-run-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { TestNavBarComponent } from './components/test-nav-bar/test-nav-bar.component';
import { StepViewComponent } from './components/step-view/step-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeViewComponent } from './components/code-view/code-view.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { StepAddComponent } from './components/step-add/step-add.component';
import { StepCreationViewComponent } from './components/step-creation-view/step-creation-view.component';
import { StepNavBarComponent } from './components/step-nav-bar/step-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowsComponent,
    SidebarComponent,
    TestEditViewComponent,
    TestRunViewComponent,
    HomeViewComponent,
    TestNavBarComponent,
    StepViewComponent,
    CodeViewComponent,
    StepAddComponent,
    StepCreationViewComponent,
    StepNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HighlightModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
