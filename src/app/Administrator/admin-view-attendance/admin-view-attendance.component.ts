import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-admin-view-attendance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-view-attendance.component.html',
  styleUrl: './admin-view-attendance.component.css'
})
export class AdminViewAttendanceComponent {
 // Explicitly define the type for classAttendanceData
 classAttendanceData: Record<string, Record<string, { status: string }[]>> = {
  "class1": {
    "2024-11-19": [
      { status: "Present" },
      { status: "Absent" },
      { status: "Present" }
    ],
    "2024-11-20": [
      { status: "Late" },
      { status: "Present" },
      { status: "Present" }
    ]
  },
  "class2": {
    "2024-11-19": [
      { status: "Present" },
      { status: "Absent" }
    ],
    "2024-11-20": [
      { status: "Late" },
      { status: "Present" }
    ]
  }
};

presentCount = 0;
absentCount = 0;
lateCount = 0;

// Function to calculate and show total attendance for selected class and date range
showTotalAttendance() {
  const classSelect = (<HTMLSelectElement>document.getElementById('class-select')).value;
  const dateInput = (<HTMLInputElement>document.getElementById('attendance-date')).value;
  const attendanceTable = document.getElementById('attendance-table');
  const attendanceBody = document.getElementById('attendance-body');
  const attendanceSummary = document.getElementById('attendance-summary');

  // Reset the table and summary
  if (attendanceBody) {
    attendanceBody.innerHTML = '';
  }
  if (attendanceTable) {
    attendanceTable.style.display = 'none';
  }
  if (attendanceSummary) {
    attendanceSummary.style.display = 'none';
  }

  if (classSelect && dateInput && this.classAttendanceData[classSelect]) {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let tableRows = '';

    const attendanceData = this.classAttendanceData[classSelect][dateInput];
    if (attendanceData) {
      totalPresent = attendanceData.filter((a: { status: string }) => a.status === 'Present').length;
      totalAbsent = attendanceData.filter((a: { status: string }) => a.status === 'Absent').length;
      totalLate = attendanceData.filter((a: { status: string }) => a.status === 'Late').length;

      tableRows += `
        <tr>
          <td>${dateInput}</td>
          <td>${totalPresent}</td>
          <td>${totalAbsent}</td>
          <td>${totalLate}</td>
        </tr>
      `;
    }

    this.presentCount = totalPresent;
    this.absentCount = totalAbsent;
    this.lateCount = totalLate;

    // Show the summary and table
    if (attendanceSummary) {
      attendanceSummary.style.display = 'flex';
    }
    if (attendanceTable) {
      attendanceTable.style.display = 'table';
    }
    if (attendanceBody) {
      attendanceBody.innerHTML = tableRows;
    }
  } else {
    alert('No attendance data found for this selection!');
  }
}

// Call showTotalAttendance on page load with default values
ngOnInit() {
  // Set default class and date values
  (<HTMLSelectElement>document.getElementById('class-select')).value = 'class1';  // Default class
  (<HTMLInputElement>document.getElementById('attendance-date')).value = '2024-11-19';  // Default date
  this.showTotalAttendance();  // Display default data
}
}
