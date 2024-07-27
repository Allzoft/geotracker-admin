import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@services/layout.service';
import { UsersService } from '@services/users.service';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  public usersService = inject(UsersService);
  public layoutService = inject(LayoutService);
  public router = inject(Router);

  public home: MenuItem = { icon: 'pi pi-home', url: 'dashboard' };

  public items = this.usersService.access();

  public model: any[] = [];

  public getBreadcrumb(): MenuItem[] {
    const items: MenuItem[] = [];
    const url = this.router.url.substring(1);
    const words = url.split('/');
    if (words[0] === 'admin') {
      const newItem: MenuItem = {
        icon: 'pi mr-2 pi-building',
        label: 'Administración',
      };
      items.push(newItem);
    } else if (words[0] === 'control-panel') {
      const newItem: MenuItem = {
        icon: 'pi mr-2 pi-th-large',
        label: 'Panel de control',
      };
      items.push(newItem);
    }
    if (words[1] === 'users') {
      const newItem: MenuItem = {
        icon: 'pi mr-2 pi-users',
        label: 'Usuarios',
        url: 'admin/users',
      };
      items.push(newItem);
    } else if (words[1] === 'roles') {
      const newItem: MenuItem = {
        icon: 'pi mr-2 pi-check',
        label: 'Roles',
        url: 'admin/roles',
      };
      items.push(newItem);
    }
    if (words[1] === 'dashboard') {
      const newItem: MenuItem = {
        icon: 'pi mr-2 pi-table',
        label: 'Dashboard',
        url: 'admin/users',
      };
      items.push(newItem);
    }

    return items;
  }
}
