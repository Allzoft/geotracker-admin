import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery-data',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './recovery-data.component.html',
})
export default class RecoveryDataComponent implements OnInit {

  ngOnInit(): void { }

}
