import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentNotificationComponent } from '../student-notification/student-notification.component';


@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [NgClass, NgFor, RouterModule,StudentNotificationComponent],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebarComponent {
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


}
