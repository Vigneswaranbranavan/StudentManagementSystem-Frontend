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
selectedClassId: string = '';
daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
timetablesByDay: { [key: string]: any[] } = {};

constructor(private classservice: ViewclassService, private timetableservice: TimetableService) {}

ngOnInit(): void {
  this.loadData();
}

loadData() {
  this.classservice.getClasses().subscribe(data => {
    this.classes = data;
  });
}

loadTimetableForClass() {
  if (this.selectedClassId) {
    this.timetableservice.getTimetableByClassId(this.selectedClassId).subscribe(data => {
      this.timetables = data;

      // Process timetable to group by day
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
  this.loadTimetableForClass();
}

// Expose the keys of timetablesByDay for the template
getTimetableDays(): string[] {
  return Object.keys(this.timetablesByDay);
}
}