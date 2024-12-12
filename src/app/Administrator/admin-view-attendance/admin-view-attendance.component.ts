import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { StudentAttendanceService } from '../../Service/Attendance/student-attendance.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Attendance } from '../../Service/Models/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-view-attendance',
  standalone: true,
  imports: [FormsModule, NgxChartsModule],
  templateUrl: './admin-view-attendance.component.html',
  styleUrl: './admin-view-attendance.component.css'
})
export class AdminViewAttendanceComponent implements OnInit {
  attendancelistData: Attendance[] = [];
  multi: any[] = []; // Data for pie chart
  barChartData: any[] = []; // Data for bar chart
  view: [number, number] = [700, 400];
  gradient = true;
  legend = true;
  showLabels = true;
  colorScheme: Color = {
    domain: ['#5AA454', '#C7B42C', '#A10A28'],
    name: 'Attendance',
    selectable: false,
    group: ScaleType.Ordinal
  };

  constructor(private attendanceService: StudentAttendanceService) {}

  ngOnInit() {
    this.loadAttendanceData();
  }

  loadAttendanceData() {
    this.attendanceService.getAllAttendance().subscribe({
      next: (data) => {
        this.attendancelistData = data;
        this.prepareChartData();
      },
      error: (error) => console.error('Error fetching attendance data', error),
    });
  }

  prepareChartData() {
    const stats = {
      Present: 0,
      Late: 0,
      Absent: 0,
    };

    // Aggregate attendance data
    this.attendancelistData.forEach((record) => {
      switch (record.status) {
        case 1:
          stats.Present += 1;
          break;
        case 2:
          stats.Late += 1;
          break;
        case 3:
          stats.Absent += 1;
          break;
      }
    });

    // Set data for the pie chart
    this.multi = [
      {
        name: 'Present',
        value: stats.Present,
      },
      {
        name: 'Late',
        value: stats.Late,
      },
      {
        name: 'Absent',
        value: stats.Absent,
      },
    ];

    // Set data for the bar chart
    this.barChartData = [
      {
        name: 'Present',
        value: stats.Present,
      },
      {
        name: 'Late',
        value: stats.Late,
      },
      {
        name: 'Absent',
        value: stats.Absent,
      },
    ];
  }
}
