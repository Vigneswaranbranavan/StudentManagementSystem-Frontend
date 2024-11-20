import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentHomeComponent } from '../student-home/student-home.component';


@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [NgClass, RouterModule,StudentHomeComponent],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebarComponent {
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


}
