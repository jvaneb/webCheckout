import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'prefix'
  },
  {
    path: 'formulario', loadChildren: () => import('./formularios/formularios.module').then(m => m.FormulariosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
