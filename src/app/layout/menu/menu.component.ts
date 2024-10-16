import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@services/layout.service';
import { UsersService } from '@services/users.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './menu.component.html',
  styles: `
  .dot-card {
     width: 2px;
     height: 2px;
   }
 `,
})
export class MenuComponent implements OnInit {
  private messageService = inject(MessageService)
  public confirmationService = inject(ConfirmationService);
  public layoutService = inject(LayoutService);
  public usersService = inject(UsersService);

  public items = this.usersService.access();

  constructor(public router: Router) {}

  ngOnInit() {
    console.log(this.items);
  }

  public toogleMenu() {
    this.layoutService.onMenuToggle();
  }

  public isOnModule(value: string): boolean {
    const url = this.router.url;

    if (url.includes(value)) return true;

    return false;
  }

  public navigateTo(link: string) {
    if (link === 'devices/recovery-data' || link === 'control-panel/reports') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Módulo en construcción',
        icon: 'pi pi-wrench',
        detail: 'Este módulo se habilitará proximamente'
      });
      return;
    }
    this.router.navigateByUrl(link);
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
