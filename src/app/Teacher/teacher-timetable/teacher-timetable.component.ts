import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-timetable',
  standalone: true,
  imports: [NgFor],
  templateUrl: './teacher-timetable.component.html',
  styleUrl: './teacher-timetable.component.css'
})
export class TeacherTimetableComponent {
 // Define the teacher's name, this could be dynamic, here it's hardcoded for demonstration.
 teacherName: string = 'Ms. Johnson';

 // Timetable data with teacher information
 timetable: DaySchedule[] = [
  {
    day: 'Monday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '10:00 AM - 11:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { time: '10:00 AM - 11:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  },
  {
    day: 'Friday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  },
  {
    day: 'Sunday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101', teacher: 'Ms. Johnson' }
    ]
  }
];


 // Filtered timetable for the current teacher
// Filtered timetable for the current teacher
get filteredTimetable() {
  return this.timetable
    .map(day => {
      const filteredClasses = day.classes.filter(classInfo => classInfo.teacher === this.teacherName);
      // Return only the first class of the teacher for that day
      return filteredClasses.length > 0 ? { day: day.day, classes: [filteredClasses[0]] } : null;
    })
    .filter(day => day !== null); // Remove null values for days with no classes for the teacher
}

}

// Define the structure for a class schedule
interface ClassSchedule {
 time: string;
 subject: string;
 location: string;
 teacher: string;  // Add teacher property to each class
}

// Define the structure for a day's schedule
interface DaySchedule {
 day: string;
 classes: ClassSchedule[];
}