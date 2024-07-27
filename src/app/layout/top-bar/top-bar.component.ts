import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/user';
import { UsersService } from '@services/users.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '@services/layout.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  public layoutService = inject(LayoutService);
  public usersService = inject(UsersService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  public user = this.usersService.user;

  constructor() {

  }

  public onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  public onProfileButtonClick() {
    this.router.navigateByUrl('/admin/user/' + this.user()!.id_user);
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
