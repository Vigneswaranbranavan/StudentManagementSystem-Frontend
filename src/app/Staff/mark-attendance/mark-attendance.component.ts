import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ViewclassService } from '../../Service/Class/viewclass.service';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent implements OnInit {
  ngOnInit(): void {
    this.loadClasses();
  }

  constructor(private classService: ViewclassService) { }

  loadClasses(): void {
    this.classService.getClasses().subscribe({
      next: (response) => {
        this.Classes = response;  // Populate the Classes array with the response
      },
      error: (err) => {
        console.error('Error fetching classes:', err);  // Handle error
      }
    });
  }
  Classes: any[] = [];
  selectedClass: any = '';

  attendanceStatuses: { value: string, label: string }[] = [
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Late Coming', label: 'Late Coming' }
  ];
  // students: { id: number, name: string, status: string }[] = [];
  students = [
    { id: 1, name: 'R. Subramani Ramasamy', status: 'Present' },
    { id: 2, name: 'G. Saravanan Gopalakrishnan', status: 'Absent' },
    { id: 3, name: 'K. Karthik Kumaravel', status: 'Late Coming' },
    { id: 4, name: 'P. Priya Devi Chandrasekar', status: 'Present' },
    { id: 5, name: 'S. Sundar Rajasekar', status: 'Absent' },
    { id: 6, name: 'M. Manoj Kumar Subramanian', status: 'Present' },
    { id: 7, name: 'A. Anjali Rameshwaran', status: 'Late Coming' },
    { id: 8, name: 'V. Vishal Kumar Bharathi', status: 'Absent' },
    { id: 9, name: 'L. Lakshmi Narayanan Sundaram', status: 'Present' },
    { id: 10, name: 'V. Vijayalakshmi Krishnaveni', status: 'Absent' },
    { id: 11, name: 'A. Aravindhan Mahalingam', status: 'Present' },
    { id: 12, name: 'N. Nithya Rani Shanmugam', status: 'Late Coming' },
    { id: 13, name: 'T. Tharun Rajan Balasubramanian', status: 'Present' },
    { id: 14, name: 'P. Priya Sundaravel', status: 'Absent' },
    { id: 15, name: 'R. Raghavan Kuppuswamy', status: 'Late Coming' },
    { id: 16, name: 'S. Shanthi Devi Rajalakshmi', status: 'Present' },
    { id: 17, name: 'R. Rajeshwaran Krishnamurthy', status: 'Absent' },
    { id: 18, name: 'S. Sangeetha Kalyanasundaram', status: 'Present' },
    { id: 19, name: 'K. Kumaravel Thirunavukarasu', status: 'Late Coming' },
    { id: 20, name: 'R. Ranjani Venkataraman', status: 'Absent' }
  ];
  
  
  

  getBackgroundColor(status: string): string {
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

  updateAttendanceStatus(studentId: number, status: string): void {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.status = status;
    }
  }

  // Calculate attendance totals
  getTotalCount(status: string): number {
    return this.students.filter(student => student.status === status).length;
  }
}

