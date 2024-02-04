import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then( //accede al modulo y busca todas las rutas hijas
        (m) => m.DashboardModule
      ),
  },
  {
    path: '404', // aca es generico si No encuentra una ruta valida, te lleva a NOT FOUND
    component: NotFoundComponent
  },
  {
    path: '**', // aca es generico si No encuentra una ruta valida, te lleva a 404
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
