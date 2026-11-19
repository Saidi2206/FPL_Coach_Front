import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home').then(m => m.Home) },
  { path: 'team/:id', loadComponent: () => import('./pages/team').then(m => m.Team) },
  { path: 'team/:id/chips', loadComponent: () => import('./pages/chips').then(m => m.Chips) },
  { path: '**', redirectTo: '' },
];