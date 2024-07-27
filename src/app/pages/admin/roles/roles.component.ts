import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './roles.component.html',
})
export default class RolesComponent implements OnInit {

  ngOnInit(): void { }

}
