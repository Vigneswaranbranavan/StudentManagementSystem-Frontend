import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { StudentService } from '../../Service/Student/student.service';
import { CommonModule } from '@angular/common';
import { StudentAttendanceService } from '../../Service/Attendance/student-attendance.service';


@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent implements OnInit {
  Classes: any[] = [];
  students: { id: number, name: string, status: string }[] = [];
  attendanceStatuses = [
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Late Coming', label: 'Late Coming' }
  ];
  selectedClass: any = '';

  constructor(
    private classService: ViewclassService,
    private studentService: StudentService,
    private attendanceService: StudentAttendanceService
  ) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classService.getClasses().subscribe({
      next: (response) => {
        this.Classes = response;
      },
      error: (err) => {
        console.error('Error fetching classes:', err);
      }
    });
  }

  loadStudents(classId: string): void {
    if (!classId) return;
    this.studentService.getStudentsByClass(classId).subscribe({
      next: (response) => {
        this.students = response.map(student => ({ ...student, status: '' }));
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  updateAttendanceStatus(studentId: number, status: string): void {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.status = status;
    }
  }

  getBackgroundColor(status: string): string {
    switch (status) {
      case 'Present': return '#28d17c';
      case 'Absent': return '#e63946';
      case 'Late Coming': return '#ffae42';
      default: return '#ffffff';
    }
  }


  getTotalCount(status: string): number {
    return this.students.filter(student => student.status === status).length;
  }

  submitAttendance(): void {
    const attendanceStatusMap: { [key: string]: number } = {
      'Present': 1,
      'Absent': 2,
      'Late Coming': 3
    };

    const attendanceData = this.students.map(student => ({
      studentID: student.id.toString(),
      date: new Date().toISOString(),
      status: attendanceStatusMap[student.status]
    }));

    this.attendanceService.submitAttendance(attendanceData).subscribe({
      next: (response) => {
        console.log('Attendance submitted successfully:', response);
        alert('Attendance submitted successfully!');
      },
      error: (err) => {
        console.error('Error submitting attendance:', err);
        alert('Failed to submit attendance. Please try again.');
      }
    });
  }
}
