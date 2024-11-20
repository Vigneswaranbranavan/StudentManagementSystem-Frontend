import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgStyle,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 // Data for the dashboard
 totalStudents = 1200;
 totalTeachers = 100;
 totalClasses = 30;
 totalSubjects = 15;

 latestActivities = [
   { activity: 'New student registered', date: 'November 20, 2024', status: 'Completed' },
   { activity: 'New teacher added', date: 'November 19, 2024', status: 'Completed' },
   { activity: 'Timetable updated', date: 'November 18, 2024', status: 'Pending' }
 ];

 notifications = [
   'New feedback received',
   'New staff registered',
   'Timetable changes'
 ];
}
