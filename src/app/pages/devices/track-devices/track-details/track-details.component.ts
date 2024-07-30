import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './track-details.component.html',
})
export default class TrackDetailsComponent implements OnInit {

  ngOnInit(): void { }

}
