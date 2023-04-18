import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowsComponent } from './components/main-windows/main-windows.component';

const routes: Routes = [
  { path: '', component: MainWindowsComponent },
  { path: 'edit', component: MainWindowsComponent },
  { path: 'run', component: MainWindowsComponent },
  { path: 'step-creation', component: MainWindowsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
