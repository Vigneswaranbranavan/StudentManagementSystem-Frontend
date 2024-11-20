import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-timetable',
  standalone: true,
  imports: [NgFor],
  templateUrl: './student-timetable.component.html',
  styleUrl: './student-timetable.component.css'
})
export class StudentTimetableComponent {
  timetable: DaySchedule[] = [
    {
      day: 'Monday',
      classes: [
        { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', location: 'Room 101' },
        { time: '11:00 AM - 12:30 PM', subject: 'Physics', location: 'Room 204' }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '10:00 AM - 11:30 AM', subject: 'Chemistry', location: 'Lab 3' },
        { time: '1:00 PM - 2:30 PM', subject: 'History', location: 'Room 105' }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '9:00 AM - 10:30 AM', subject: 'Biology', location: 'Room 303' },
        { time: '11:00 AM - 12:30 PM', subject: 'English', location: 'Room 102' }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { time: '10:00 AM - 11:30 AM', subject: 'Geography', location: 'Room 201' },
        { time: '1:00 PM - 2:30 PM', subject: 'Mathematics', location: 'Room 101' }
      ]
    },
    {
      day: 'Friday',
      classes: [
        { time: '9:00 AM - 10:30 AM', subject: 'Physics', location: 'Room 204' },
        { time: '11:00 AM - 12:30 PM', subject: 'Chemistry', location: 'Lab 3' }
      ]
    },
    {
      day: 'Saturday',
      classes: [
        { time: '9:00 AM - 10:30 AM', subject: 'Physics', location: 'Room 204' },
        { time: '11:00 AM - 12:30 PM', subject: 'Chemistry', location: 'Lab 3' }
      ]
    },
    {
      day: 'Sunday',
      classes: [
        { time: '9:00 AM - 10:30 AM', subject: 'Physics', location: 'Room 204' },
        { time: '11:00 AM - 12:30 PM', subject: 'Chemistry', location: 'Lab 3' }
      ]
    }
  ];
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
