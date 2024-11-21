import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-view-timetables',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-view-timetables.component.html',
  styleUrl: './admin-view-timetables.component.css'
})
export class AdminViewTimetablesComponent {
// Define the timetable data for all classes
timetableData: { [key: string]: DaySchedule[] } = {
  'class-1': [
    { day: 'Monday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101' }, { time: '10:45 AM - 12:15 PM', subject: 'Physics', location: 'Room 204' }] },
    { day: 'Tuesday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'Chemistry', location: 'Lab 3' }] },
    { day: 'Wednesday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'Biology', location: 'Room 303' }] },
    { day: 'Thursday', classes: [{ time: '1:00 PM - 2:30 PM', subject: 'History', location: 'Room 105' }] },
    { day: 'Friday', classes: [{ time: '11:00 AM - 12:30 PM', subject: 'English', location: 'Room 102' }] },
    { day: 'Saturday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101' }] },
    { day: 'Sunday', classes: [{ time: '10:00 AM - 11:30 AM', subject: 'Physics', location: 'Room 204' }] },
  ],
  'class-2': [
    { day: 'Monday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'Biology', location: 'Room 303' }] },
    { day: 'Tuesday', classes: [{ time: '10:00 AM - 11:30 AM', subject: 'Geography', location: 'Room 201' }] },
    { day: 'Wednesday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'English', location: 'Room 102' }] },
    { day: 'Thursday', classes: [{ time: '1:00 PM - 2:30 PM', subject: 'Mathematics', location: 'Room 101' }] },
    { day: 'Friday', classes: [{ time: '11:00 AM - 12:30 PM', subject: 'History', location: 'Room 105' }] },
    { day: 'Saturday', classes: [{ time: '10:00 AM - 11:30 AM', subject: 'Geography', location: 'Room 201' }] },
    { day: 'Sunday', classes: [{ time: '9:00 AM - 10:30 AM', subject: 'Biology', location: 'Room 303' }] },
  ],
  // Add more classes as needed
};

// Define class options for the dropdown
classOptions = [
  { value: 'class-1', name: 'Class 1' },
  { value: 'class-2', name: 'Class 2' },
  // More classes can be added
];

// Set the default selected class
selectedClass: string = 'class-1';
selectedClassTimetable: DaySchedule[] | null = this.timetableData[this.selectedClass];

// Days of the week
daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Handle the class selection change event
onClassChange(event: Event): void {
  const selectedClass = (event.target as HTMLSelectElement).value;
  this.selectedClassTimetable = this.timetableData[selectedClass] || null;
}

// Get classes for a specific day
getClassForDay(day: string) {
  if (!this.selectedClassTimetable) return [];
  const daySchedule = this.selectedClassTimetable.find(schedule => schedule.day === day);
  return daySchedule ? daySchedule.classes : [];
}
}

// Define the structure for a class schedule
interface ClassSchedule {
time: string;
subject: string;
location: string;
}

// Define the structure for a day's schedule
interface DaySchedule {
day: string;
classes: ClassSchedule[];
}
