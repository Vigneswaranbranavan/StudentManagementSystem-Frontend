import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { teacher } from '../../Service/Models/model';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-sidebar',
  standalone: true,
  imports: [RouterModule,HttpClientModule,ReactiveFormsModule,NgClass],
  templateUrl: './teacher-sidebar.component.html',
  styleUrl: './teacher-sidebar.component.css',
  providers:[TeacherProfileService]
})
export class TeacherSidebarComponent  {
  isOpen = true;
  userName: string = '';

  teacherid: string;
  

  toggleSidebar() {
    this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  }


  constructor
  (  
    private teacherProfileService: TeacherProfileService,
    private route: ActivatedRoute
  )
  {
    const Sid = this.route.snapshot.paramMap.get('id');
    this.teacherid = String(Sid);
  }

  
}