import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { student } from '../../Service/Models/model';



@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule,CommonModule],

  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css',
  providers: [StudentProfileService]
})
export class StudentSidebarComponent {
  isOpen = true;
  // studentid: any | string;
  userId: string = '';  // User ID will be fetched from localStorage
  date = ''

  student: student = {
    id: '',
    name: '',
    phone: '',
    enrollmentDate: '',
    classID: '',
    class: {
      id: '',
      className: '',
    },
    userRes: {
      id: '',
      email: ''
    }
  };



  toggleSidebar() {
    this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  }

  constructor
    (
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












