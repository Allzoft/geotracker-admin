import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@services/layout.service';
import { UsersService } from '@services/users.service';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public confirmationService = inject(ConfirmationService);
  public layoutService = inject(LayoutService);
  public usersService = inject(UsersService);

  public items = this.usersService.access();


  public model: any[] = [];

  constructor(public router: Router) {}

  ngOnInit() {
    const dataSection = this.items.map((item) => {
      return { name: item.section, icon: item.icon, position: item.position };
    });
    let sections: any = {};
    sections = dataSection.filter((section: any) =>
      sections[section.name] ? false : (sections[section.name] = true)
    );

    let itemsSection: any[] = [];
    sections.map((section: any) => {
      if (section.name == 'root') {
        const items = this.items
          .filter((item) => item.section === 'root')
          .map((item) => {
            return {
              label: item.name,
              icon: `pi pi-fw pi-${item.icon}`,
              routerLink: [`${item.father}${item.link}`],
              items: null,
              position: item.position,
              command: () => {
                if (this.layoutService.isMobile()) {
                  this.layoutService.onMenuToggle();
                }
              },
            };
          });
        itemsSection.push(...items);
      } else {
        const items_items = this.items
          .filter((item) => item.section === section.name)
          .map((item) => {
            return {
              label: item.name,
              routerLink: [`${item.father}${item.link}`],
            };
          });
        const items: MenuItem = {
          label: section.name,
          icon: `pi pi-fw pi-${section.icon}`,
          routerLink: ['/'],
          items: items_items,
          position: section.position,
          command: () => {
            if (this.layoutService.isMobile()) {
              this.layoutService.onMenuToggle();
            }
          },
        };
        itemsSection.push(items);
      }
    });

    const groupByPosition = itemsSection.reduce((group, item) => {
      const { position } = item;
      group[position] = group[position] ?? [];
      group[position].push(item);
      return group;
    }, {});

    const divisions = [
      { name: 'Análisis y control', icon: 'pi pi-table' },
      { name: 'Pruebas', icon: 'pi pi-home' },
      { name: 'Administracion', icon: 'pi pi-cog' },
    ];

    this.model = divisions
      .map((item, index) => {
        return {
          label: item.name,
          icon: item.icon,
          items: groupByPosition[index],
        };
      })
      .filter((obj) => obj.items);
  }

  public toogleMenu() {
    this.layoutService.onMenuToggle();
  }

  public closeSession() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea cerrar sesión?',
      acceptLabel: 'Si',
      acceptButtonStyleClass: 'p-button-rounded p-button-success w-7rem',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-rounded p-button-danger w-7rem',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.closeSession();
      },
    });
  }
}
