import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Teacher } from '../../Service/Models/model';
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



  teacher: Teacher = {
    id: '', // Use string for UUID
    name: '',
    email: '',
    phone: '',
    subjectID: '',
  };


  constructor
  (  
    private teacherProfileService: TeacherProfileService,
    private route: ActivatedRoute
  )
  {
    const Sid = this.route.snapshot.paramMap.get('id');
    this.teacherid = String(Sid);
  }

  ngOnInit(): void {
    if (this.teacherid) {
      this.getTeacherInfo(this.teacherid);  // Fetch student data using teacherid
    }
  }

  getTeacherInfo(teacherid: string) {
    this.teacherProfileService.getTeacher(teacherid).subscribe(
      (data) => {
        this.teacher = data;
      },
      (error) => {
        console.error('Error fetching student:', error);
        // Optionally, show user-friendly error messages (e.g., using toastr)
      }
    );
}
}