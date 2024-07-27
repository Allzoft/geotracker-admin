import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UsersService } from '@services/users.service';
import { UserLogin } from '@interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutService } from '@services/layout.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    TopBarComponent,
    MenuComponent,
  ],
  providers: [MessageService],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {
  private usersService = inject(UsersService);
  public layoutService = inject(LayoutService);
  private messageService = inject(MessageService);

  constructor(private route: Router) {}
}
