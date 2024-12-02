import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { TimetableService } from '../../Service/Timetable/timetable.service';

@Component({
  selector: 'app-viewtimetable',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './viewtimetable.component.html',
  styleUrl: './viewtimetable.component.css',
  providers: [TimetableService, ViewclassService]
})
export class ViewtimetableComponent {
date: Date = new Date();
  timetables: any[] = [];
  classes: any[] = [];
  selectedClassId: string = ''; // Initially empty
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  timetablesByDay: { [key: string]: any[] } = {};
  userRole: string ="";

  constructor(private classservice: ViewclassService, private timetableservice: TimetableService) {}

  ngOnInit(): void {
    this.loadData();
    this.userRole = localStorage.getItem('role') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userRole);  // For debugging

    if (!this.userRole) {
      console.error('User ID not found in localStorage!');
    }
  }


 
  loadData() {
    // Load classes from the service
    this.classservice.getClasses().subscribe(data => {
      this.classes = data;

      // Automatically select the first class if available
      if (this.classes.length > 0) {
        this.selectedClassId = this.classes[0].id; // Set the first class ID
        this.loadTimetableForClass(); // Load timetable for the first class
      }
    });
  }

  loadTimetableForClass() {
    // Fetch timetable for the selected class
    if (this.selectedClassId) {
      this.timetableservice.getTimetableByClassId(this.selectedClassId).subscribe(data => {
        this.timetables = data;

        // Group timetable by day
        this.timetablesByDay = {};
        for (const timetable of this.timetables) {
          const date = new Date(timetable.date); // Parse the date
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name (e.g., Monday)
          if (!this.timetablesByDay[dayName]) {
            this.timetablesByDay[dayName] = [];
          }
          this.timetablesByDay[dayName].push(timetable);
        }
      });
    }
  }

  onClassChange() {
    // When the user selects a class, load its timetable
    this.loadTimetableForClass();
  }

  // Expose the keys of timetablesByDay for the template
  getTimetableDays(): string[] {
    return Object.keys(this.timetablesByDay);
  }
}