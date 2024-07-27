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
        path: 'admin',
        children: [
          {
            path: 'users',
            title: 'Lista de Usuarios',
            loadComponent: () =>
              import('./pages/admin/users/users.component'),
          },
          {
            path: 'roles',
            title: 'Roles de sistema',
            loadComponent: () =>
              import('./pages/admin/roles/roles.component'),
          },

          {
            path: '',
            redirectTo: 'admin',
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
