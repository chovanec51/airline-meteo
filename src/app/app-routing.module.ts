import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';
import { OutputComponent } from './output/output.component';

const routes: Routes = [
  {
    path: '',
    component: MainFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'output',
    component: OutputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
