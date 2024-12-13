import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-sidebar',
  standalone: true,
  imports: [NgClass ,RouterModule],
  templateUrl: './staff-sidebar.component.html',
  styleUrl: './staff-sidebar.component.css'
})
export class StaffSidebarComponent {
  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

}
