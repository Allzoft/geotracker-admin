import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevicesService } from '@services/devices.service';
import { LayoutService } from '@services/layout.service';
import { CardEmptyListComponent } from '@shared/card-empty-list/card-empty-list.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Device, TypeDevice } from '@interfaces/device';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-devices-list',
  standalone: true,
  imports: [
    CardEmptyListComponent,
    CommonModule,
    OverlayPanelModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    SidebarModule,
    TableModule,
    SkeletonModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './devices-list.component.html',
})
export default class DevicesListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  private confirmationService = inject(ConfirmationService);
  public messageService = inject(MessageService);
  private devicesService = inject(DevicesService);
  public layoutService = inject(LayoutService);

  public filterOptions = ['Semanal', 'Mensual', 'Peronalizado'];
  public valueFilter = this.filterOptions.find(
    (option) => option === 'Semanal'
  );

  public skeletonTab = [1, 2, 3, 4, 5, 6, 7];

  public devices = this.devicesService.devices;
  public loading = this.devicesService.loading;

  public selectedDevice: Device = {
    id_device: 0,
    created_by_user: 0,
    info: '',
    name: '',
    type_device: TypeDevice.PERFIL_DE_FACEBOOK,
  };

  public inputsDirt = {
    name: false,
    type_device: false,
  };

  public optiosDevice = [
    'Perfil de facebook',
    'Cuenta de whatsapp',
    'Cuenta de telegram',
    'Otro',
  ];

  public showDevice: boolean = false;

  ngOnInit(): void {
    this.devicesService.getDevices();
  }

  public createDevice() {
    this.selectedDevice = {
      id_device: 0,
      created_by_user: 0,
      info: '',
      name: '',
      type_device: TypeDevice.PERFIL_DE_FACEBOOK,
    };
    this.showDevice = true;
  }

  public editDevice(device: Device) {
    this.selectedDevice = device;
    this.showDevice = true;
  }

  public deleteDevice(device: Device) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el dispositivo ' + device.name,
      acceptLabel: 'Si',
      acceptButtonStyleClass: 'p-button-rounded p-button-success w-7rem',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-rounded p-button-danger w-7rem',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.devicesService.deleteDevice(device.id_device).subscribe((_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminación exitosa',
            detail: `${device.name} eliminado exitosamente`,
          });
        });
      },
    });
  }

  public async saveDevice() {
    if (!(await this.passDeviceForm())) return;

    const newDevice: Partial<Device> = {
      name: this.selectedDevice.name,
      info: this.selectedDevice.info,
      type_device: this.selectedDevice.type_device,
    };
    if (this.selectedDevice.id_device === 0) {
      this.devicesService.postDevice(newDevice).subscribe((resDevice) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Creación exitosa',
          detail: `El dispositivo ${resDevice.name} se creo exitosamente`,
        });
        this.dt.reset();
        this.showDevice = false;
      });
    } else {
      this.devicesService
        .updateDevice(this.selectedDevice.id_device, newDevice)
        .subscribe((resDevice) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Creación exitosa',
            detail: `El dispositivo ${resDevice.name} se actualizo exitosamente`,
          });
          this.dt.reset();
          this.showDevice = false;
        });
    }
  }

  public passDeviceForm(): Promise<boolean> {
    if (!this.selectedDevice.name) {
      this.inputsDirt.name = true;
      return Promise.resolve(false);
    }
    if (!this.selectedDevice.type_device) {
      this.inputsDirt.type_device = true;
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
}
