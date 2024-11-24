import { NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-sidebar',
  standalone: true,
  imports: [RouterModule,NgClass,HttpClientModule,ReactiveFormsModule],
  templateUrl: './teacher-sidebar.component.html',
  styleUrl: './teacher-sidebar.component.css'
})
export class TeacherSidebarComponent {
  isOpen = true;
  teacherId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the teacherId from the route parameter
    this.route.paramMap.subscribe(params => {
      this.teacherId = params.get('id'); // Adjust based on your route definition
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
