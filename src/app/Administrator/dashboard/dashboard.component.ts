import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeacherRegisterService } from '../../Service/Register/Teacher/teacher-register.service';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';
import { StaffRegisterService } from '../../Service/Register/staff-register.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[TeacherRegisterService, StudentRegisterService, ViewclassService, ViewSubjectService, StaffRegisterService]
})
export class DashboardComponent implements OnInit{
 // Data for the dashboard
 totalStudents = 0;
 totalTeachers = 0;
 totalClasses = 0;
 totalSubjects = 0;
 totalStaffs = 0 ;

  constructor(private teacherService : TeacherRegisterService,private studentService: StudentRegisterService, private classService: ViewclassService, private subjectservice: ViewSubjectService, private staffService:StaffRegisterService){}

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


 ngOnInit(): void {
  this.loadTeachers();
  this.loadStudents();
  this.loadClasses();
  this.loadSubjects();
  this.loadStaffs();

}

loadTeachers(): void {
  this.teacherService.getTeachers().subscribe({
    next: (teachers) => {
      this.totalTeachers = teachers.length;
    },
    error: (err) => {
      console.error('Error fetching teachers:', err);
    },
  });
}


loadStudents(): void {
  this.studentService.getStudents().subscribe({
    next: (students) => {
      this.totalStudents = students.length;
    },
    error: (err) => {
      console.error('Error fetching students:', err);
    },
  });
}


loadClasses(): void {
  this.classService.getClasses().subscribe({
    next: (classes) => {
      this.totalClasses = classes.length;
    },
    error: (err) => {
      console.error('Error fetching classes:', err);
    },
  });
}

loadSubjects(): void {
  this.subjectservice.getSubjects().subscribe({
    next: (subjects) => {
      this.totalSubjects = subjects.length;
    },
    error: (err) => {
      console.error('Error fetching subjects:', err);
    },
  });
}

loadStaffs(): void {
  this.staffService.getstaffs().subscribe({
    next: (staffs) => {
      this.totalStaffs = staffs.length;
    },
    error: (err) => {
      console.error('Error fetching staffs:', err);
    },
  });
}



}
