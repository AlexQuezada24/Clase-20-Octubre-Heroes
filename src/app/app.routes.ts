import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-personajes',
    pathMatch: 'full',
  },
  {
    path: 'lista-personajes',
    loadComponent: () => import('./pages/lista-personajes/lista-personajes.page').then( m => m.ListaPersonajesPage)
  },
  {
    path: 'detalle-personaje/:id',
    loadComponent: () => import('./pages/detalle-personaje/detalle-personaje.page').then( m => m.DetallePersonajePage)
  },
  {
    path: '**',
    redirectTo: 'lista-personajes'
  }
];
