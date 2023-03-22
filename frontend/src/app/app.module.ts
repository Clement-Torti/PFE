import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainWindowsComponent } from './components/main-windows/main-windows.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestEditViewComponent } from './components/test-edit-view/test-edit-view.component';
import { TestRunViewComponent } from './components/test-run-view/test-run-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { TestNavBarComponent } from './components/test-nav-bar/test-nav-bar.component';
import { StepViewComponent } from './components/step-view/step-view.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
