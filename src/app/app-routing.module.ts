import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';
import { OutputComponent } from './output/output.component';
import { outputGuard } from './shared/guards/output.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  },
  {
    path: 'form',
    component: MainFormComponent,
  },
  {
    path: 'output',
    component: OutputComponent,
    canActivate: [outputGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
