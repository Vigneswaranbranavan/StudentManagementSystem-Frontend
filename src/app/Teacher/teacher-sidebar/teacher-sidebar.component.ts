import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  userId: string='';


  Teacher: teacher = {
    id: '',
  name: '',
  phone: '',
  subjectID: '',
  subject: {
    id: '',
    subjectName: '',
  },
  userRes: {
    id: '',
    email: ''
  }
  };

  constructor(
    private TeacherProfileService: TeacherProfileService,
    private route: ActivatedRoute,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);
    if (this.userId) {
      this.getTeacherInfo(this.userId);  // Fetch student data using studentid
    }
  }

  getTeacherInfo(teacherid: string) {
    this.TeacherProfileService.getTeacher(teacherid).subscribe(
      (data) => {
        this.Teacher = data;
      },
      (error) => {
        console.error('Error fetching Teacher:', error);
        // Optionally, show user-friendly error messages (e.g., using toastr)
        console.log(this.Teacher);

      }
    );
  }

  logout() {
    // Clear local storage
    localStorage.clear();

    // Redirect to the home page
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  }


}
