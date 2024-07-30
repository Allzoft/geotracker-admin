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
        path: 'devices',
        children: [
          {
            path: 'recovery-data',
            title: 'Recuperación de archivos',
            loadComponent: () =>
              import('./pages/devices/recovery-data/recovery-data.component'),
          },
          {
            path: 'track-devices',
            title: 'Rastreo de dispositivos',
            loadComponent: () =>
              import('./pages/devices/track-devices/track-devices.component'),
          },
          {
            path: 'track-details/:id',
            title: 'Detalles de rastreo',
            loadComponent: () =>
              import('./pages/devices/track-devices/track-details/track-details.component'),
          },
          {
            path: 'devices-list',
            title: 'Lista de dispositivos',
            loadComponent: () =>
              import('./pages/devices/devices-list/devices-list.component'),
          },
          {
            path: '',
            redirectTo: 'devices',
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
