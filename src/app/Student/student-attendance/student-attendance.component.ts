import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Service/Student/student.service';
import { FormsModule } from '@angular/forms';
import { StudentAttendanceService } from '../../Service/Attendance/student-attendance.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Attendance, student } from '../../Service/Models/model';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { StudentNotificationService } from '../../Service/Notification/student-notification.service';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule,FormsModule,ToastrModule],
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  attendanceDate: string = '';
  attendanceRecords: any[] = [];
  totalClasses: number = 0;
  presentCount: number = 0;
  lateComingCount: number = 0;
  attendanceRate: number = 0;
  userId: string = ''; // User ID will be fetched from localStorage
  student: any = { id: '', name: '', classID: '', class: { id: '', className: '' }, gender: 0 };

  showMessage: boolean = false;

  constructor(
    private attendanceService: StudentAttendanceService,
    private toastr: ToastrService,
    private studentProfileService: StudentProfileService,
    private notificationService: StudentNotificationService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId') || '';
    // console.log('userId from localStorage:', this.userId);

    if (this.userId) {
      this.getStudentInfo(this.userId);
      this.checkAndPostNotification();
    }
  }


  getStudentInfo(studentId: string): void {
    this.studentProfileService.getStudent(studentId).subscribe({
      next: (data) => {
        this.student = data;
        this.loadAttendanceRecords();
      },
      error: (error) => {
        console.error('Error fetching student:', error);
        // this.toastr.error('Failed to load student data.');
      }
    });
  }

  loadAttendanceRecords(): void {
    if (!this.student.id) return;
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



  checkAndPostNotification(): void {
    const notificationType = localStorage.getItem('notificationType');

    // If "Attendance Warning" is not in localStorage, post the notification
    if (notificationType !== 'Attendance Warning') {
      const notification = {
        userID: this.userId,
        notificationType: 'Attendance Warning',
        message: `Your attendance is below 85%. Please improve your attendance.`,
        date: new Date().toISOString(),
      };

      this.notificationService.postNotification(notification).subscribe({
        next: () => {
          // Save the notification type in localStorage to avoid posting the same notification again
          localStorage.setItem('notificationType', 'Attendance Warning');
          // this.toastr.success('Attendance Warning notification posted successfully.');
        },
        error: (err) => {
          console.error('Error posting notification:', err);
          // this.toastr.error('Failed to post Attendance Warning notification.');
        }
      });
    }
  }

  showInfoMessage(): void {
    this.showMessage = true;
  }

  closeInfoMessage(): void {
    this.showMessage = false;
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
          // this.toastr.error('Failed to load attendance records for the selected date.');
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

}
