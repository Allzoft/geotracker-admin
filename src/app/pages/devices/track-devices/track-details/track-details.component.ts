import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tracker } from '@interfaces/tracker';
import { LayoutService } from '@services/layout.service';
import { TrackersService } from '@services/trackers.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    ButtonModule,
    SkeletonModule,
    InputTextareaModule,
    SkeletonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './track-details.component.html',
})
export default class TrackDetailsComponent implements OnInit {
  public messageService = inject(MessageService);
  public trackersService = inject(TrackersService);
  public layoutService = inject(LayoutService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  public idTracker: string = this.route.snapshot.paramMap.get('id')!;
  public tracker!: Tracker;

  public loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.trackersService.getOneTracker(+this.idTracker).subscribe(
      (res) => {
        this.tracker = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }


}
