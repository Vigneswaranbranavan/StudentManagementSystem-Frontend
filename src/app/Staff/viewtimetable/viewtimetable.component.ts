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
  selectedDate: string = '';
  timetables: any[] = [];
  classes: any[] = [];
  selectedClassId: string = '';
  timetablesByDay: { [key: string]: any[] } = {};
  userRole: string = '';
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private timetableservice: TimetableService,
    private classservice: ViewclassService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.userRole = localStorage.getItem('role') || '';
  }

  loadData() {
    this.classservice.getClasses().subscribe((data) => {
      this.classes = data;
      if (this.classes.length > 0) {
        this.selectedClassId = this.classes[0].id;
        this.loadTimetableForClass();
      }
    });
  }

  loadTimetableForClass() {
    if (this.selectedClassId) {
      this.timetableservice.getTimetableByClassId(this.selectedClassId).subscribe((data) => {
        this.groupTimetablesByDay(data);
      });
    }
  }

  onClassChange() {
    if (this.selectedClassId) {
      this.loadTimetableForClass();
    }
  }

  onDateChange() {
    if (this.selectedDate && this.selectedClassId) {
      const selectedDateObj = new Date(this.selectedDate);

      this.timetableservice.getTimetableByClassId(this.selectedClassId).subscribe((data) => {
        const filteredTimetables = data.filter((timetable: any) => {
          const timetableDate = new Date(timetable.date);
          return (
            timetableDate.getFullYear() === selectedDateObj.getFullYear() &&
            timetableDate.getMonth() === selectedDateObj.getMonth() &&
            timetableDate.getDate() === selectedDateObj.getDate()
          );
        });

        this.groupTimetablesByDay(filteredTimetables);
      });
    } else {
      this.loadTimetableForClass();
    }
  }

  groupTimetablesByDay(timetables: any[]) {
    this.timetablesByDay = {};
    for (const timetable of timetables) {
      const date = new Date(timetable.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (!this.timetablesByDay[dayName]) {
        this.timetablesByDay[dayName] = [];
      }
      this.timetablesByDay[dayName].push(timetable);
    }
  }

  getTimetableDays(): string[] {
    return Object.keys(this.timetablesByDay);
  }
}
