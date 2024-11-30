import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../Service/Student/student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']  // Fixed typo here (styleUrl -> styleUrls)
})
export class StudentAttendanceComponent implements OnInit {
  studentId!: number;
  student: any;
  attendanceSummary = {
    presentDays: 0,
    absentDays: 0,
    lateDays: 0
  };
  attendanceDetails: any[] = [];
  selectedDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response) => {
        this.student = response;
        this.attendanceSummary = response.attendanceSummary;
        this.attendanceDetails = response.attendanceDetails;
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
      }
    });
  }

  // Method to show attendance details based on the selected date
  showAttendanceDetails(): void {
    if (this.selectedDate) {
      this.studentService.getAttendanceByDate(this.studentId, this.selectedDate).subscribe({
        next: (response) => {
          this.attendanceDetails = response;
        },
        error: (err) => {
          console.error('Error fetching attendance details:', err);
        }
      });
    }
  }

  // Method to determine background color based on attendance status
  getStatusColor(status: string): string {
    switch (status) {
      case 'Present': return '#28d17c'; // Green
      case 'Absent': return '#e63946'; // Red
      case 'Late': return '#ffae42'; // Orange
      default: return '#ffffff'; // Default color
    }
  }
}