import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-sidebar',
  standalone: true,
  imports: [RouterModule,NgClass],
  templateUrl: './teacher-sidebar.component.html',
  styleUrl: './teacher-sidebar.component.css'
})
export class TeacherSidebarComponent {
  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
