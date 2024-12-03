import { Component, OnInit, reflectComponentType } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { student, teacher } from '../../Service/Models/model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule],
  providers:[TeacherProfileService]

})
export class TeacherProfileComponent implements OnInit {

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
    private route: ActivatedRoute
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
}