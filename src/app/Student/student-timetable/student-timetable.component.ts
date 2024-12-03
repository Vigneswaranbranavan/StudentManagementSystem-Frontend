import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TimetableEntry, TimetableService } from '../../Service/Timetable/timetable.service';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { student } from '../../Service/Models/model';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';

@Component({
  selector: 'app-student-timetable',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css'],
  providers: [TimetableService]
})
export class StudentTimetableComponent implements OnInit {
  date: Date = new Date();
  timetables: any[] = [];
  classes: any[] = [];
  selectedClassId: string = ''; // Initially empty
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  timetablesByDay: { [key: string]: any[] } = {};
  userRole: string ="";
  userId: string = '';  // User ID will be fetched from localStorage
  student: student = {
    id: '',
  name: '',
  phone: '',
  enrollmentDate:'',
  classID: '',
  class: {
    id:'',
    className: '',
  },
  userRes: {
    id:'',
    email: ''
  }
  };


  constructor(private classservice: ViewclassService, private timetableservice: TimetableService,    private studentProfileService: StudentProfileService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.userRole = localStorage.getItem('role') || ''; // Get the logged-in user's role from localStorage
    console.log('userRole from localStorage:', this.userRole);  // For debugging
  
    if (!this.userRole) {
      console.error('User role not found in localStorage!');
    }
  
    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);
    if (this.userId) {
      this.getStudentInfo(this.userId);  // Fetch student data using studentid
    }
  }
  
  getStudentInfo(studentid: string) {
    this.studentProfileService.getStudent(studentid).subscribe(
      (data) => {
        this.student = data;
        // Once the student data is loaded, load the timetable for their class
        this.selectedClassId = this.student.classID; // Set the selectedClassId to the student's class
        this.loadTimetableForClass();  // Load timetable for the student's class
  
        // Filter classes to show only the student’s class in the dropdown
        this.classes = this.classes.filter((classItem) => classItem.id === this.student.classID);
      },
      (error) => {
        console.error('Error fetching student:', error);
      }
    );
  }
  
  loadData() {
    // Load classes from the service, but now we will filter them later for the student
    this.classservice.getClasses().subscribe(data => {
      this.classes = data;
  
      // You can skip the automatic selection here if the student’s class is already selected
      if (this.student.classID) {
        this.selectedClassId = this.student.classID; // Set selectedClassId from student data
        this.loadTimetableForClass(); // Load timetable for the student's class
      }
    });
  }
  
  loadTimetableForClass() {
    // Fetch timetable for the student's class (using student.classID)
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
    // When the user selects a different class, load its timetable
    this.loadTimetableForClass();
  }
  
  // Expose the keys of timetablesByDay for the template
  getTimetableDays(): string[] {
    return Object.keys(this.timetablesByDay);
  }
}  