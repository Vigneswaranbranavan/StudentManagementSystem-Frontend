import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Service/Student/student.service';
import { FormsModule } from '@angular/forms';
import { StudentAttendanceService } from '../../Service/Attendance/student-attendance.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Attendance, student } from '../../Service/Models/model';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule,FormsModule,ToastrModule],
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  attendanceDate: string = '';
  attendanceRecords: Attendance[] = [];
  totalClasses: number = 0;
  presentCount: number = 0; 
  lateComingCount: number = 0;
  attendanceRate: number = 0;
  showMessage: boolean = false;


  userId: string = ''; // User ID will be fetched from localStorage
  student: student = {
    id: '', // STUDENT ID
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
    },
    gender: 0,
    indexNumber: ''
  };

  constructor(
    private attendanceService: StudentAttendanceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private studentProfileService: StudentProfileService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);

    if (this.userId) {
      this.getStudentInfo(this.userId);  // Fetch student data using userId
    }
  }

  getStudentInfo(studentId: string): void {
    this.studentProfileService.getStudent(studentId).subscribe({
      next: (data) => {
        this.student = data;
        console.log('Student data:', this.student);
        this.loadAttendanceRecords();
      },
      error: (error) => {
        console.error('Error fetching student:', error);
        this.toastr.error('Failed to load student data.');
      }
    });
  }

  loadAttendanceRecords(): void {
    if (!this.student.id) return;  // Ensure student.id is populated

    this.attendanceService.getAttendanceByStudentId(this.student.id).subscribe({
      next: (response) => {
        this.attendanceRecords = response;
        this.calculateAttendanceStats();
      },
      error: (err) => {
        console.error('Error fetching attendance:', err);
        this.toastr.error('Failed to load attendance records.');
      }
    });
  }

  filterByDate(): void {
    if (this.attendanceDate) {
      this.attendanceService.getAttendanceByStudentAndDate(this.student.id, this.attendanceDate).subscribe({
        next: (response) => {
          this.attendanceRecords = response;
          this.calculateAttendanceStats();
        },
        error: (err) => {
          console.error('Error fetching attendance:', err);
          this.toastr.error('Failed to load attendance records for the selected date.');
        }
      });
    }
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Present';
      case 2:
        return 'Absent';
      case 3:
        return 'Late Coming';
      default:
        return 'Unknown';
    }
  }

  // Calculate total classes, present, and late coming counts
  calculateAttendanceStats(): void {
    this.totalClasses = this.attendanceRecords.length;
    this.presentCount = this.attendanceRecords.filter(record => record.status === 1).length;
    this.lateComingCount = this.attendanceRecords.filter(record => record.status === 3).length;

    if (this.totalClasses > 0) {
      this.attendanceRate = ((this.presentCount + this.lateComingCount )/ this.totalClasses) * 100;
    } else {
      this.attendanceRate = 0;  
    }
  }

   showInfoMessage(): void {
    this.showMessage = true;
  }
  closeInfoMessage(): void {
    this.showMessage = false;
  }

}


