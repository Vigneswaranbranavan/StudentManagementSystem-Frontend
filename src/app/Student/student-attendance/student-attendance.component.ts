import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Service/Student/student.service';
import { FormsModule } from '@angular/forms';
import { StudentAttendanceService } from '../../Service/Attendance/student-attendance.service';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {

  attendanceSummary = {
    presentDays: 0,
    absentDays: 0,
    lateDays: 0
  };

  attendanceDetails: { time: string; subject: string; status: string }[] = [];
  selectedDate: string = '';
  studentId: string = '';
  
 
  constructor(
    private route: ActivatedRoute,
    private studentAttendanceService: StudentAttendanceService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      this.fetchAttendanceSummary();
    });
  }
  fetchAttendanceSummary(): void {
    this.studentAttendanceService.getAttendanceSummary(this.studentId).subscribe({
      next: (summary) => {
        this.attendanceSummary = summary;
      },
      error: (err) => {
        console.error('Error fetching attendance summary:', err);
      }
    });
  }

  fetchAttendanceDetails(): void {
    if (!this.selectedDate) return;

    this.studentAttendanceService.getAttendanceDetails(this.studentId, this.selectedDate).subscribe({
      next: (details) => {
        this.attendanceDetails = details;
      },
      error: (err) => {
        console.error('Error fetching attendance details:', err);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Present':
        return '#28d17c';
      case 'Absent':
        return '#e63946';
      case 'Late Coming':
        return '#ffae42';
      default:
        return '#ffffff';
    }
  }
}