import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent {

  attendanceStatuses: { value: string, label: string }[] = [
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Late Coming', label: 'Late Coming' }
  ];
  // students: { id: number, name: string, status: string }[] = [];
  students = [
    { id: 1, name: 'John Doe', status: 'Present' },
    { id: 2, name: 'Jane Smith', status: 'Absent' },
    { id: 3, name: 'Robert Brown', status: 'Late Coming' },
    { id: 4, name: 'Emily White', status: 'Present' },
    { id: 5, name: 'Michael Johnson', status: 'Absent' }
  ];

  getBackgroundColor(status: string): string {
    switch (status) {
      case 'Present':
        return '#28a745'; 
      case 'Absent':
        return '#dc3545';
      case 'Late Coming':
        return '#fd7e14';
      default:
        return '#ffffff';
    }
  }
  
  updateAttendanceStatus(studentId: number, status: string): void {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.status = status;
    }
  }
}

