import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Device } from '@interfaces/device';
import { State, Tracker, TypeState, TypeURLTracker } from '@interfaces/tracker';
import { DevicesService } from '@services/devices.service';
import { LayoutService } from '@services/layout.service';
import { StatesService } from '@services/states.service';
import { TrackersService } from '@services/trackers.service';
import { CardEmptyListComponent } from '@shared/card-empty-list/card-empty-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-track-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    OverlayPanelModule,
    CardEmptyListComponent,
    DropdownModule,
    TagModule,
    TableModule,
    SkeletonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './track-devices.component.html',
})
export default class TrackDevicesComponent implements OnInit {
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  public statesService = inject(StatesService);
  public layoutService = inject(LayoutService);
  public trackersService = inject(TrackersService);
  public devicesService = inject(DevicesService);

  optionsTrackers: TypeURLTracker[] = [
    TypeURLTracker.PERSONAS_CERCANAS,
    TypeURLTracker.GOOGLE_DRIVE,
    TypeURLTracker.GRUPO_DE_WHATSAPP_FALSO,
    TypeURLTracker.ZOOM,
    TypeURLTracker.GRUPO_DE_WHATSAPP_REAL,
    TypeURLTracker.GOOGLE_RECAPTCHA,
    TypeURLTracker.GRUPO_DE_TELEGRAM,
  ];
  valueTypeTracker: TypeURLTracker = TypeURLTracker.PERSONAS_CERCANAS;

  public states: State[] = [];

  public filterOptions = ['Semanal', 'Mensual', 'Personalizado'];
  public valueFilter: 'Semanal' | 'Mensual' | 'Personalizado' = 'Semanal';

  public date: (Date | null)[] = [
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(new Date().setDate(new Date().getDate() + 1)),
  ];

  public skeletonTab = [1, 2, 3, 4, 5, 6, 7];

  public devices = this.devicesService.devices;
  public loadingDevices = this.devicesService.loading;
  public trackers = this.trackersService.trackers;
  public loading = this.trackersService.loading;

  public selectedDevice?: Device;

  ngOnInit(): void {
    this.fetchTrackers();
    this.statesService.getStatesByTpe(TypeState.RASTREO).subscribe((res) => {
      this.states = res;
    });
    this.devicesService.getDevices();
  }

  public getTracksSuccess(): number {
    return this.trackers().filter(
      (tracker) => tracker.state?.name === 'Rastreo exitoso'
    ).length;
  }

  public changeFilter() {
    if (this.valueFilter === 'Semanal') {
      this.date = [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(new Date().setDate(new Date().getDate() + 1)),
      ];
    }
    if (this.valueFilter === 'Mensual') {
      this.date = [
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date(new Date().setDate(new Date().getDate() + 1)),
      ];
    }
    if (this.valueFilter === 'Personalizado') {
      this.date = [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(new Date().setDate(new Date().getDate() + 1)),
      ];
    }
    this.fetchTrackers();
  }

  public fetchTrackers(): void {
    const [startDate, endDate] = this.date;

    if (startDate === null || endDate === null) {
      this.messageService.add({
        severity: 'info',
        summary: 'Seleccione ambas fechas',
        detail: 'Se debe tener ambas fechas para obtener los datos',
      });
      return;
    }

    this.trackersService.getTrackers(this.date[0]!, this.date[1]!);
  }

  public saveTracker() {
    if (!this.selectedDevice) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Escoge un dispositivo porfavor',
      });
      return;
    }
    const state = this.states.find((state) => state.priority === 1);

    if (!state) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se encontro el estado, hable con soporte porfavor',
      });
      return;
    }

    if (this.valueTypeTracker !== TypeURLTracker.PERSONAS_CERCANAS) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por ahora solo tenemos habilitado Personas cercanas',
      });
      return;
    }

    const newTracker: Partial<Tracker> = {
      deviceIdDevice: this.selectedDevice.id_device,
      stateIdState: state!.id_state,
      type_url: this.valueTypeTracker,
    };

    this.trackersService.postTracker(newTracker).subscribe((_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Rastreo creado exitosamente',
      });
    });
  }

  public deleteTracker(tracker: Tracker) {
    this.confirmationService.confirm({
      message:
        'Esta seguro de eliminar el rastreo al dispositivo' +
        tracker!.device!.name,
      acceptLabel: 'Si',
      acceptButtonStyleClass: 'p-button-rounded p-button-success w-7rem',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-rounded p-button-danger w-7rem',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trackersService
          .deleteTracker(tracker.id_tracker)
          .subscribe((_) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminación exitosa',
              detail: `Rastreo eliminado exitosamente`,
            });
          });
      },
    });
  }
}
