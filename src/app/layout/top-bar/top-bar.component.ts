import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { User } from '@interfaces/user';
import { UsersService } from '@services/users.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '@services/layout.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    BadgeModule,
    ConfirmDialogModule,
    SplitButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './top-bar.component.html',

})
export class TopBarComponent {
  private messageService = inject(MessageService)
  public layoutService = inject(LayoutService);
  public usersService = inject(UsersService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public title: string = '';

  public items: MenuItem[] = [
    {
      icon: 'pi pi-pencil',
      label: 'Actualizar info',
      command: () => {},
    },
    {
      label: 'Cambiar Foto',
      icon: 'pi pi-image',
    },
    { separator: true },
    {
      icon: 'pi pi-sign-out',
      label: 'Cerrar sesión',
      command: () => {
        this.closeSession();
      },
    },
  ];

  public user = this.usersService.user;

  constructor() {}

  public onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  public onProfileButtonClick() {
    this.router.navigateByUrl('/admin/user/' + this.user()!.id_user);
  }

  public showDisableButton(){
    this.messageService.add({
      severity: 'warn',
      summary: 'Módulo en construcción',
      icon: 'pi pi-wrench',
      detail: 'Este módulo se habilitará proximamente'
    });
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

  public getTitle(): string {
    if(this.router.url.includes('dashboard')) return 'Dashboard'
    if(this.router.url.includes('users')) return 'Usuarios'
    if(this.router.url.includes('roles')) return 'Roles'
    if(this.router.url.includes('track')) return 'Rastreo de disp.  '
    if(this.router.url.includes('list')) return 'Lista de dispositivos'
    if(this.router.url.includes('recovery')) return 'Gestión de datos'
    return '';
  }
}
