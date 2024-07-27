import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
  },
  {
    loadComponent: () => import('./layout/layout.component'),
    path: '',
    children: [
      {
        path: 'control-panel',
        children: [
          {
            path: 'dashboard',
            title: 'Dashboard',
            loadComponent: () =>
              import('./pages/controlPanel/dashboard/dashboard.component'),
          },

          {
            path: '',
            redirectTo: 'control-panel',
            pathMatch: 'full',
          },
        ],
      },

      {
        path: '',
        redirectTo: 'control-panel/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
