import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.css'
})
export class StudentAttendanceComponent {
    // Define the type for studentAttendanceData with an index signature
    studentAttendanceData: { [key: string]: { time: string; subject: string; status: string }[] } = {
      "2024-11-19": [
        { time: "9:00 AM - 10:30 AM", subject: "Mathematics", status: "Present" },
        { time: "11:00 AM - 12:30 PM", subject: "Physics", status: "Absent" },
        { time: "1:00 PM - 2:30 PM", subject: "Chemistry", status: "Late" },
        { time: "3:00 PM - 4:30 PM", subject: "English", status: "Present" }
      ],
      "2024-11-20": [
        { time: "9:00 AM - 10:30 AM", subject: "Mathematics", status: "Present" },
        { time: "11:00 AM - 12:30 PM", subject: "Physics", status: "Absent" },
        { time: "1:00 PM - 2:30 PM", subject: "Chemistry", status: "Late" }
      ],
      "2024-11-21": [
        { time: "9:00 AM - 10:30 AM", subject: "Biology", status: "Present" },
        { time: "11:00 AM - 12:30 PM", subject: "English", status: "Present" }
      ]
    };
  
    // Function to display the attendance details for the selected date
    showAttendanceDetails() {
      const date = (document.getElementById('attendance-date') as HTMLInputElement).value;
      const attendanceTable = document.getElementById('attendance-table') as HTMLElement;
      const attendanceBody = document.getElementById('attendance-body') as HTMLElement;
  
      // Reset the table
      attendanceBody.innerHTML = '';
      attendanceTable.style.display = 'none';
  
      // Check if there is attendance data for the selected date
      if (this.studentAttendanceData[date]) {
        // If data exists, populate the table
        const attendanceData = this.studentAttendanceData[date];
  
        attendanceData.forEach(record => {
          const row = document.createElement('tr');
  
          // Time
          const timeCell = document.createElement('td');
          timeCell.textContent = record.time;
          row.appendChild(timeCell);
  
          // Subject
          const subjectCell = document.createElement('td');
          subjectCell.textContent = record.subject;
          row.appendChild(subjectCell);
  
          // Attendance Status
          const statusCell = document.createElement('td');
          const status = record.status;
          statusCell.textContent = status;
  
          // Add status color
          if (status === "Present") {
            statusCell.classList.add('status-present');
          } else if (status === "Absent") {
            statusCell.classList.add('status-absent');
          } else if (status === "Late") {
            statusCell.classList.add('status-late');
          }
  
          row.appendChild(statusCell);
  
          // Append row to the table body
          attendanceBody.appendChild(row);
        });
  
        // Display the table
        attendanceTable.style.display = 'table';
      } else {
        alert('No attendance data available for this date.');
      }
    }
  
    // Set the default date to today's date and disable future dates on page load
    ngOnInit() {
      const dateInput = document.getElementById('attendance-date') as HTMLInputElement;
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.setAttribute('max', today);
      this.showAttendanceDetails();
    }

}
