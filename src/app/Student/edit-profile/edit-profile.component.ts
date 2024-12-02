import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { student } from '../../Service/Models/model';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [
    RouterModule,HttpClientModule, ReactiveFormsModule,CommonModule
  ],
  providers: [StudentProfileService]
})
export class EditProfileComponent implements OnInit {

  userId: string = '';  // User ID will be fetched from localStorage
date=''
  
  student: student = {
    id: '',
  name: '',
  phone: '',
  enrollmentDate:'',
  classID: '',
  class: {
    id:'',
    className: '',
  },
  userRes: {
    id:'',
    email: ''
  }
  };

  constructor(
    private studentProfileService: StudentProfileService,
    private route: ActivatedRoute
  ) {
   
  }

  ngOnInit(): void {

    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);
    if (this.userId) {
      this.getStudentInfo(this.userId);  // Fetch student data using studentid
    }
  }

  getStudentInfo(studentid: string) {
    this.studentProfileService.getStudent(studentid).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student:', error);
        // Optionally, show user-friendly error messages (e.g., using toastr)
      }
    );
  }
}
