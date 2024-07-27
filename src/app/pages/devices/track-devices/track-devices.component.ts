import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '@services/layout.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-track-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
    TableModule,
    SkeletonModule
  ],
  templateUrl: './track-devices.component.html',
})
export default class TrackDevicesComponent implements OnInit {
  public layoutService = inject(LayoutService)

  public filterOptions = ['Semanal', 'Mensual', 'Peronalizado']
  public valueFilter = this.filterOptions.find((option)=>option === 'Semanal')

  public skeletonTab = [1,2,3,4,5,6,7]

  public devices = []
  public loading = false

  ngOnInit(): void { }

}
