import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ImageModule } from 'primeng/image';
import { LayoutService } from '@services/layout.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SkeletonModule,
    ImageModule,
    OverlayPanelModule,
  ],
  templateUrl: './users.component.html',
})
export default class UsersComponent implements OnInit {
  public usersService = inject(UsersService);
  public layoutService = inject(LayoutService)

  public users = this.usersService.users;
  public loading = this.usersService.loading;

  public selectedUsers = [];

  public skeletonTab = [1, 2, 3, 4, 5, 7];

  ngOnInit(): void {
    this.usersService.getUsers();
  }
}
