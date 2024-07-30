import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tracker } from '@interfaces/tracker';
import { LayoutService } from '@services/layout.service';
import { TrackersSocket } from '@services/sockets/trackers.socket';
import { TrackersService } from '@services/trackers.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Messages, MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    ButtonModule,
    MessagesModule,
    SkeletonModule,
    InputTextareaModule,
    SkeletonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService, TrackersSocket],
  templateUrl: './track-details.component.html',
})
export default class TrackDetailsComponent implements OnInit {
  @ViewChild('mssg') mssg!: Messages;
  public messageService = inject(MessageService);
  public trackersService = inject(TrackersService);
  public layoutService = inject(LayoutService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  public trackersSocket = inject(TrackersSocket);

  public idTracker: string = this.route.snapshot.paramMap.get('id')!;
  public tracker!: Tracker;

  public loading = false;

  public messages: Message[] = [];

  private messageSubscription!: Subscription;
  private logSubscription!: Subscription;
  private errorSubscription!: Subscription;

  ngOnInit(): void {
    this.loading = true;
    this.trackersService.getOneTracker(+this.idTracker).subscribe(
      (res) => {
        this.tracker = res;
        console.log(res);

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.messageSubscription = this.trackersSocket
      .getMessage()
      .subscribe((msg: any) => {
        const newMessage: Message = {
          severity: 'warn',
          detail: msg,
          icon: 'pi pi-info-circle',
        };
        this.messageService.add(newMessage);
        this.messages.push(newMessage);
      });

    this.logSubscription = this.trackersSocket
      .getLog()
      .subscribe((log: any) => {
        const newMessage: Message = {
          severity: 'secondary',
          detail: log,
          icon: 'pi pi-info-circle',
        };
        this.messages.push(newMessage);
        if (
          log.includes(
            '======================================================='
          ) ||
          log.includes('Command to be executed') ||
          log.includes('Pseudo-terminal will not be allocated') ||
          log.includes('please mention it if you send me')
        ) {
          return;
        }
        if (
          log.includes('Open your tunnel address on your mobile with this QR')
        ) {
          const newMessageS: Message = {
            severity: 'secondary',
            detail: log.split('Open your tunnel')[0],
            icon: 'pi pi-info-circle',
          };
          this.messageService.add(newMessageS);
          return;
        }
        if (log.includes('Rastro exitoso')) {
          const newMessageS: Message = {
            severity: 'success',
            detail: log,
          };
          this.messageService.add(newMessageS);
          setTimeout(() => {
            location.reload();
          }, 5000);
          return;
        }

        this.messageService.add(newMessage);
      });
    this.logSubscription = this.trackersSocket
      .getError()
      .subscribe((msg: any) => {
        const newMessage: Message = {
          severity: 'danger',
          detail: msg,
        };
        this.messageService.add(newMessage);
        this.messages.push(newMessage);
      });
  }

  ngOnDestroy(): void {
    this.trackersSocket.closeConnection();
  }

  public initConecction() {
    this.trackersSocket.runTracker(
      '0',
      this.messages[1].detail!,
      this.idTracker
    );
  }

  public hasRunTracker(): boolean {
    return this.messages.some((message) =>
      message.detail?.includes('Waiting for Client...')
    );
  }

  public getLink() {
    this.trackersSocket.getUrlTracker(this.messages[1].detail!);
  }

  public closeSession() {
    this.trackersSocket.closeConnection();
    const newMessage: Message = {
      severity: 'success',
      detail: 'Se cerro la sesión',
    };
    this.messages.push(newMessage);
    this.messageService.add(newMessage);
  }

  public blockInit(): boolean {
    return this.messages.some((message) =>
      message.detail?.includes('Se cerro la sesión')
    );
  }

  public goGMaps() {
    const mapsUrl = `https://www.google.com/maps?q=${
      this.tracker.latitude.split(' ')[0]
    },${this.tracker.longitude.split(' ')[0]}`;

    // Abrir la URL en una nueva pestaña
    window.open(mapsUrl, '_blank');
  }
}
